import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateDetailDescriptionDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('CREATE_PRODUCT')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('detail')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('CREATE_PRODUCT')
  createProductDetail(@Body() createProductDto: CreateDetailDescriptionDto) {
    return this.productService.createDetailDescription(createProductDto);
  }

  @Get('category/:categoryId')
  @IsPublic()
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.findByCategory(+categoryId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('READ_PRODUCT')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('READ_PRODUCT')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('EDIT_PRODUCT')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('EDIT_PRODUCT')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
