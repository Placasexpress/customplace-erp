import { AddressType, ClientContactType } from '@prisma/client';

export class CreateClientDto {
  name: string;
  icms: boolean;
  document: string;
  identity_card: string;
  companyId: number;
  addresses: CreateClientAddressDto[];
  contacts: CreateClientContactDto[];
}

export class UpdateClientDto {
  id?: number;
  name?: string;
  icms?: boolean;
  document?: string;
  identity_card?: string;
  addresses?: UpdateClientAddressDto[];
  contacts?: UpdateClientContactDto[];
}

export class CreateClientAddressDto {
  type: AddressType;
  zip_code: string;
  number: number;
  complement: string;
  neighborhood: string;
  state: string;
  city: string;
}

export class UpdateClientAddressDto {
  id?: number;
  type?: AddressType;
  zip_code?: number;
  number?: number;
  complement?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
}

export class CreateClientContactDto {
  type: ClientContactType;
  email: string;
  phone: string;
}

export class UpdateClientContactDto {
  id?: number;
  type?: ClientContactType;
  email?: string;
  phone?: string;
}
