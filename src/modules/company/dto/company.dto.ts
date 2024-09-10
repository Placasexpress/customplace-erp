import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  type: string;

  @IsInt()
  marketplaceProfileId: number;

  @IsInt()
  userId: number;
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  marketplaceProfileId?: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}
