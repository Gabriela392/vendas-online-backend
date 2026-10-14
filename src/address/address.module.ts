import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module.js';
import { CityEntity } from '../city/entities/city.entity.js';
import { UserModule } from '../user/user.module.js';
import { UserEntity } from '../user/entities/user.entity.js';
import { AddressController } from './address.controller.js';
import { AddressService } from './address.service.js';
import { AddressEntity } from './entities/address.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity, UserEntity, CityEntity]),
    UserModule,
    CityModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}