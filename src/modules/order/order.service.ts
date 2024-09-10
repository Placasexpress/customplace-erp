import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OrderService {
  private iuguApiKey: string;
  private account_id: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.iuguApiKey = this.configService.get<string>('IUGU_API_KEY');
    this.account_id = this.configService.get<string>('ACCOUNT_ID');
  }

  async create(createOrderDto: CreateOrderDto) {
    let statusOrder;

    const { productId, price, status, quantity, detailDescriptions } =
      createOrderDto;

    if (!productId) {
      throw new BadRequestException(
        'O ID do produto é necessário para calcular a margem de vendas.',
      );
    }

    const salesMargin = await this.prisma.salesMargin.findFirst({
      where: {
        productId: productId,
        AND: [{ qtdFrom: { lte: quantity } }, { qtyTo: { gte: quantity } }],
      },
    });

    if (!salesMargin) {
      throw new BadRequestException(
        'Nenhuma margem de vendas aplicável foi encontrada para a quantidade especificada.',
      );
    }

    const detailDescriptionIds = detailDescriptions.map(
      (desc) => desc.detailDescriptionId,
    );

    const fetchedDescriptions = await this.prisma.detailDescription.findMany({
      where: { id: { in: detailDescriptionIds } },
    });

    const totalPriceCost = fetchedDescriptions.reduce(
      (sum, desc) => sum + desc.price_cost * quantity,
      0,
    );

    const finalPrice = totalPriceCost * (1 + salesMargin.marginPercent / 100);

    if (price !== finalPrice) {
      statusOrder = 'Aprovação';
    }

    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        status: statusOrder || status,
      },
    });

    for (const detail of detailDescriptions) {
      await this.prisma.orderProductDescription.create({
        data: {
          orderId: order.id,
          detailDescriptionId: detail.detailDescriptionId,
        },
      });
    }
  }

  async listAllOrders(clientId: number) {
    return await this.prisma.order.findMany({
      where: { clientId: clientId },
      include: {
        client: {
          include: { addresses: true, contacts: true, company: true },
        },
        product: {
          include: {
            category: true,
            detailDescriptions: {
              include: {
                detailDescription: {
                  include: {
                    productDetail: true,
                  },
                },
              },
            },
            salesMargins: true,
            steps: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        client: {
          include: { addresses: true, contacts: true, company: true },
        },
        product: {
          include: {
            category: true,
            detailDescriptions: {
              include: {
                detailDescription: {
                  include: {
                    productDetail: true,
                  },
                },
              },
            },
            salesMargins: true,
            steps: true,
          },
        },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    return this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        status: order.status,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async createInvoice(orderId: number) {
    const order = await this.findOne(orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    if (!order.clientId) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const client = await this.prisma.client.findUnique({
      where: { id: order.clientId },
      include: { contacts: true, addresses: true },
    });

    const product = order.product;

    let totalCents = 0;

    const invoiceItems = product.detailDescriptions.flatMap(
      (detailDescription) => {
        const productDetail = detailDescription.detailDescription;
        const totalQty = order.quantity;
        const salesMargins = product.salesMargins;

        const applicableMargin = salesMargins.find(
          (margin) => totalQty >= margin.qtdFrom && totalQty <= margin.qtyTo,
        );

        const marginPercent = applicableMargin
          ? applicableMargin.marginPercent
          : 0;

        const totalCost = Math.round(
          productDetail.price_cost * totalQty * (1 + marginPercent / 100) * 100,
        );

        totalCents += totalCost * totalQty;

        return {
          ...productDetail,
          totalCostInCents: totalCost,
        };
      },
    );

    const invoiceData = {
      payer: {
        name: client.name,
        cpf_cnpj: client.document,
      },
      payable_with: [order.payment_option],
      email: client.contacts.find((client) => client.type === 'COMPRAS').email,
      due_date: new Date().toISOString().split('T')[0],
      items: invoiceItems,
    };

    try {
      const response = await axios.post(
        'https://api.iugu.com/v1/invoices',
        invoiceData,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(this.iuguApiKey + ':').toString('base64')}`,
          },
        },
      );

      const iuguInvoice = response.data;

      const invoice = await this.prisma.invoice.create({
        data: {
          orderId: order.id,
          iuguId: iuguInvoice.id,
          status: iuguInvoice.status,
          dueDate: new Date(iuguInvoice.due_date),
          totalCents: totalCents,
        },
      });

      return {
        invoice,
        iuguInvoice,
      };
    } catch (error) {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'error' },
      });

      throw new Error(`Failed to create invoice: ${error}`);
    }
  }

  async approveOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }

    if (order.status === 'Aprovado') {
      throw new BadRequestException('Este pedido já foi aprovado.');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'Aprovado' },
    });

    return updatedOrder;
  }
}
