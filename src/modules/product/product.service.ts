import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDetailDescriptionDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId },
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: {
              include: {
                productDetail: true,
              },
            },
          },
        },
        category: true,
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    const { salesMargins, detailDescriptions, ...productData } =
      createProductDto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        salesMargins: {
          create: salesMargins,
        },
        detailDescriptions: {
          create: detailDescriptions.map((detailDescription) => ({
            detailDescription: {
              connect: {
                id: detailDescription.id,
              },
            },
          })),
        },
      },
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: true,
          },
        },
        category: true,
      },
    });
    return product;
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: true,
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: true,
          },
        },
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { salesMargins, detailDescriptions, ...productData } =
      updateProductDto;
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        salesMargins: {
          deleteMany: {},
          create: salesMargins,
        },
        detailDescriptions: {
          deleteMany: {},
          create: detailDescriptions.map((detailDescription) => ({
            detailDescription: {
              connect: {
                id: detailDescription.id,
              },
            },
          })),
        },
      },
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: true,
          },
        },
        category: true,
      },
    });
    return product;
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
      include: {
        salesMargins: true,
        detailDescriptions: {
          include: {
            detailDescription: true,
          },
        },
        category: true,
      },
    });
  }

  async createDetailDescription(createProductDto: CreateDetailDescriptionDto) {
    return await this.prisma.detailDescription.create({
      data: {
        description: createProductDto.description,
        price_cost: createProductDto.price_cost,
        productDetail: {
          create: {
            detail: createProductDto.detail,
          },
        },
      },
    });
  }
}
