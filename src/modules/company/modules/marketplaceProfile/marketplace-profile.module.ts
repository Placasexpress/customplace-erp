import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { MarketplaceProfileService } from './marketplace-profile.service';
import { MarketplaceProfileController } from './marketplace-profile.controller';

@Module({
  controllers: [MarketplaceProfileController],
  providers: [PrismaService, MarketplaceProfileService],
})
export class MarketplaceProfileModule {}
