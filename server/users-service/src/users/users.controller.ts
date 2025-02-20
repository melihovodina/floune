import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user
    } catch (error) {
      throw error
    }
  }

  @Get()
  async findByName(@Query('name') name: string) {
    try {
      const users = await this.usersService.findByName(name);
      return users;
    } catch (error) {
      throw error
    }
  } 

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findById(+id);
      return user
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return user;
    } catch (error) { 
      throw error
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(+id);
      return user
    } catch (error) {
      throw error
    }
  }
}
