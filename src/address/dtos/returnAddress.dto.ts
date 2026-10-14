import type { AddressEntity } from '../entities/address.entity.js';

export class ReturnAddressDto {
  id: number;
  cityId: number;
  userId: number;
  street: string;
  number: string;
  complement?: string;
  cep: string;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.cityId = address.cityId;
    this.userId = address.userId;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.cep = address.cep;
  }
}
