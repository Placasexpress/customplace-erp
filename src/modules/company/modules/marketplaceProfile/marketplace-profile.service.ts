import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMarketplaceProfileDto } from './dto/marketplace-profile.dto';
import { UpdateMarketplaceProfileDto } from './dto/update-marketplace-profile.dto';

@Injectable()
export class MarketplaceProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMarketplaceProfileDto: CreateMarketplaceProfileDto) {
    return this.prisma.marketplaceProfile.create({
      data: {
        name: createMarketplaceProfileDto.name,
        address: createMarketplaceProfileDto.addressId
          ? { connect: { id: createMarketplaceProfileDto.addressId } }
          : undefined,
        company: createMarketplaceProfileDto.companyId
          ? { connect: { id: createMarketplaceProfileDto.companyId } }
          : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.marketplaceProfile.findMany({
      include: {
        address: true,
        company: true,
      },
    });
  }

  async findOne(id: number) {
    const marketplaceProfile = await this.prisma.marketplaceProfile.findUnique({
      where: { id },
      include: {
        address: true,
        company: true,
      },
    });

    if (!marketplaceProfile) {
      throw new NotFoundException(`MarketplaceProfile with ID ${id} not found`);
    }

    return marketplaceProfile;
  }

  async update(
    id: number,
    updateMarketplaceProfileDto: UpdateMarketplaceProfileDto,
  ) {
    return this.prisma.marketplaceProfile.update({
      where: { id },
      data: {
        name: updateMarketplaceProfileDto.name,
        address: updateMarketplaceProfileDto.addressId
          ? { connect: { id: updateMarketplaceProfileDto.addressId } }
          : undefined,
        company: updateMarketplaceProfileDto.companyId
          ? { connect: { id: updateMarketplaceProfileDto.companyId } }
          : undefined,
      },
    });
  }
}
