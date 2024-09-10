import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto, user: User) {
    const profile = await this.prisma.profile.findUnique({
      where: { user_id: user.id },
    });

    return this.prisma.address.create({
      data: {
        phone_number: createAddressDto.phone_number,
        type: createAddressDto.type,
        profile_id: profile.id,
        number: createAddressDto.number,
        street: createAddressDto.street,
        zip_code: createAddressDto.zip_code,
        district: createAddressDto.district,
        city: createAddressDto.city,
      },
    });
  }

  async listAll(user: User) {
    const profile = await this.prisma.profile.findUnique({
      where: { user_id: user.id },
    });

    return this.prisma.address.findMany({ where: { profile_id: profile.id } });
  }
}
