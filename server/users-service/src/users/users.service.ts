import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs'
import { IsEmail } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private prismaService:PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const [existingEmail, existingUsername] = await Promise.all([
      this.prismaService.user.findUnique({ where: { email: createUserDto.email } }),
      this.prismaService.user.findUnique({ where: { username: createUserDto.username } }),
    ]);
  
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }
  
    if (existingUsername) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      },
    });

    return user;
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: {id} })
    return user
  }

  async findByName(name: string) {
    const user = await this.prismaService.user.findUnique({ where: {username: name} })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
    
    return user;
  }

  async remove(id: number) {
    const user = await this.prismaService.user.delete({ where: {id} });
    return user
  }
}
