import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    try {
      return this.usersService.create(createUserDto) 
    } catch (error) {
      throw error
    }
  }
}
