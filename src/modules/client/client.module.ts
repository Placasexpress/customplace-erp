import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [PrismaService, ClientService],
})
export class ClientModule {}
