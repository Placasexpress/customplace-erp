import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MarketplaceProfileService } from './marketplace-profile.service';
import { CreateMarketplaceProfileDto } from './dto/marketplace-profile.dto';
import { UpdateMarketplaceProfileDto } from './dto/update-marketplace-profile.dto';

@Controller('marketplace-profile')
export class MarketplaceProfileController {
  constructor(
    private readonly marketplaceProfileService: MarketplaceProfileService,
  ) {}

  @Post()
  create(@Body() createMarketplaceProfileDto: CreateMarketplaceProfileDto) {
    return this.marketplaceProfileService.create(createMarketplaceProfileDto);
  }

  @Get()
  findAll() {
    return this.marketplaceProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marketplaceProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMarketplaceProfileDto: UpdateMarketplaceProfileDto,
  ) {
    return this.marketplaceProfileService.update(
      +id,
      updateMarketplaceProfileDto,
    );
  }
}
