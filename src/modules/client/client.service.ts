import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateClientDto,
  UpdateClientDto,
  UpdateClientAddressDto,
  CreateClientContactDto,
  UpdateClientContactDto,
} from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: createClientDto.name,
        icms: createClientDto.icms,
        document: createClientDto.document,
        identity_card: createClientDto.identity_card,
        company: {
          connect: { id: createClientDto.companyId },
        },
        addresses: {
          create: createClientDto.addresses.map((address) => ({
            type: address.type,
            zip_code: +address.zip_code,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            state: address.state,
            city: address.city,
          })),
        },
        contacts: {
          create: createClientDto.contacts.map((contact) => ({
            type: contact.type,
            email: contact.email,
            phone: contact.phone,
          })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany({
      include: {
        addresses: true,
        contacts: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        addresses: true,
        contacts: true,
      },
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: {
        name: updateClientDto.name,
        icms: updateClientDto.icms,
        document: updateClientDto.document,
        identity_card: updateClientDto.identity_card,
        addresses: {
          upsert: updateClientDto.addresses?.map((address) => ({
            where: { id: address.id || 0 },
            create: {
              type: address.type,
              zip_code: address.zip_code,
              number: address.number,
              complement: address.complement,
              neighborhood: address.neighborhood,
              state: address.state,
              city: address.city,
            },
            update: {
              type: address.type,
              zip_code: address.zip_code,
              number: address.number,
              complement: address.complement,
              neighborhood: address.neighborhood,
              state: address.state,
              city: address.city,
            } as UpdateClientAddressDto,
          })),
        },
        contacts: {
          upsert: updateClientDto.contacts?.map((contact) => ({
            where: { id: contact.id || 0 },
            create: {
              type: contact.type,
              email: contact.email,
              phone: contact.phone,
            } as CreateClientContactDto, // Corrigido para usar CreateClientContactDto
            update: {
              type: contact.type,
              email: contact.email,
              phone: contact.phone,
            } as UpdateClientContactDto,
          })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
