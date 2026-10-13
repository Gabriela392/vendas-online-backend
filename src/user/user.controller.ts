import { Controller, Post, Body, Get } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto.js';
import { UserService } from './user.service.js';
import type { User } from './interfaces/user.entity.js';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto):Promise<User> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}