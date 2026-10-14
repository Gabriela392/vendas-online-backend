import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/entities/city.entity.js';
import { UserEntity } from '../user/entities/user.entity.js';
import { CreateAddressDto } from './dtos/createAddress.dto.js';
import { AddressEntity } from './entities/address.entity.js';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const city = await this.cityRepository.findOne({
      where: { id: createAddressDto.cityId },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      userId,
    });

    return this.addressRepository.save(address);
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    return this.addressRepository.find({
      where: { userId },
    });
  }
}
