import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UserController } from './user/user.controller.js';
import { UserService } from './user/user.service.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
