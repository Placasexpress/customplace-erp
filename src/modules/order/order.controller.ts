import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('CREATE_ORDER')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('READ_ORDER')
  findAll(@Param('clientId') clientId: string) {
    return this.orderService.listAllOrders(+clientId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('READ_ORDER')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('EDIT_ORDER')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('APPROVE_ORDER')
  async approveOrder(@Param('id') id: number) {
    const order = await this.orderService.approveOrder(id);
    if (!order) {
      throw new BadRequestException('Pedido não encontrado ou já aprovado.');
    }
    return {
      message: 'Pedido aprovado com sucesso!',
      order,
    };
  }

  @Post(':id/invoice')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('CREATE_FINANCE')
  async createInvoice(@Param('id') id: number) {
    await this.orderService.createInvoice(id);
  }
}
