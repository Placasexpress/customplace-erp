import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentOption } from '@prisma/client';

class DetailDescriptionDto {
  @IsInt()
  detailDescriptionId: number;
}

export class CreateOrderDto {
  @IsString()
  orderNumber: string;

  @IsInt()
  clientId: number;

  @IsInt()
  @IsOptional()
  productId?: number;

  @IsInt()
  price: number;

  @IsInt()
  @IsOptional()
  stepId?: number;

  @IsString()
  status: string;

  @IsInt()
  addressId?: number;

  @IsInt()
  quantity: number;

  @IsString()
  payment_option: PaymentOption;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDescriptionDto)
  detailDescriptions: DetailDescriptionDto[];
}
