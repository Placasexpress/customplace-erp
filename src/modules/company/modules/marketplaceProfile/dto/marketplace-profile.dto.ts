import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMarketplaceProfileDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  addressId?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;
}
