import { IsEnum, IsInt, IsNumberString, IsString } from 'class-validator';
import { Address, AddressType } from '../entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto extends Address {
  @ApiProperty({
    description: 'The type of the address (e.g., Residential, Commercial)',
    enum: AddressType,
    example: AddressType.ENVIO,
  })
  @IsEnum(AddressType, { message: 'Type must be a valid address type value' })
  type: AddressType;

  @ApiProperty({
    description: 'The phone number associated with the address',
    example: '1234567890',
  })
  @IsNumberString()
  phone_number: string;

  @ApiProperty({
    description: 'The number of the address',
    example: 123,
  })
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'The street name of the address',
    example: 'Main St',
  })
  @IsString()
  street: string;

  @ApiProperty({
    description: 'The zip code of the address',
    example: '12345',
  })
  @IsString()
  zip_code: string;

  @ApiProperty({
    description: 'The district of the address',
    example: 'Downtown',
  })
  @IsString()
  district: string;

  @ApiProperty({
    description: 'The city of the address',
    example: 'New York',
  })
  @IsString()
  city: string;
}
