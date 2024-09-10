export enum AddressType {
  EMPRESA = 'EMPRESA',
  CASA = 'CASA',
  ENVIO = 'ENVIO',
  CONTATO = 'CONTATO',
}

export class Address {
  id?: number;
  type?: AddressType;
  phone_number?: string;
  street: string;
  number: number;
  zip_code: string;
  district: string;
  city: string;
}
