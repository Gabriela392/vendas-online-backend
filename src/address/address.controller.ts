import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator.js';
import { UserId } from '../decorators/user-id.decorator.js';
import { UserType } from '../user/enum/user-type.enum.js';
import { AddressService } from './address.service.js';
import { CreateAddressDto } from './dtos/createAddress.dto.js';
import { ReturnAddressDto } from './dtos/returnAddress.dto.js';
import { AddressEntity } from './entities/address.entity.js';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new ReturnAddressDto(address),
    );
  }
}