import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateSalesMarginDto {
  @IsNumber()
  qtdFrom: number;

  @IsNumber()
  qtyTo: number;

  @IsNumber()
  marginPercent: number;
}

export class CreateDetailDescriptionDto {
  @IsString()
  description: string;

  @IsString()
  detail: string;

  @IsNumber()
  price_cost: number;
}

class CreateProductDetailDescriptionDto {
  @IsInt()
  id: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  categoryId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesMarginDto)
  salesMargins: CreateSalesMarginDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDetailDescriptionDto)
  detailDescriptions: CreateProductDetailDescriptionDto[];
}

export class UpdateProductDto extends CreateProductDto {}
