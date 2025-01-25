import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService:PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.create({ data: createUserDto})
    return user
  }
}
 