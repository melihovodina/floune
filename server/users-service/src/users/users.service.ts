import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService:PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: createUserDto
    });
    return user
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: {id} })
    return user
  }

  async findByName(name: string) {
    const user = await this.prismaService.user.findUnique({ where: {username: name} })
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: {id},
      data: updateUserDto,
    });
    return user
  }

  async remove(id: string) {
    const user = await this.prismaService.user.delete({ where: {id} });
    return user
  }
}
