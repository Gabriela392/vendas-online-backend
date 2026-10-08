import { Controller, Post, Body } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto.js';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return createUser;
  }
}
 