import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UsePipes,
  ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto.js';
import { UserService } from './user.service.js';
import { ReturnUserDto } from './dtos/returnUser.dto.js';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
  @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
      return new ReturnUserDto(await this.userService.createUser(createUser));
  }

  @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
        (userEntity) => new ReturnUserDto(userEntity),
    );
  }
}