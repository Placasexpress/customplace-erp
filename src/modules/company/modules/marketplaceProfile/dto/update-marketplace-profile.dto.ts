import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMarketplaceProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  addressId?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;
}
