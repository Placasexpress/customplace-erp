import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressService } from './address.services';
import { AddressController } from './address.controller';

@Module({
  controllers: [AddressController],
  providers: [PrismaService, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
