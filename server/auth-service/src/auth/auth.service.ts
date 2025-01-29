import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService:PrismaService) {}
  async signUp(signUpDto: any) {
    const isEmailInUse = await this.prismaService.auth.findOne()
    if(isEmailInUse) {
      throw new BadRequestException('email already in use')
    }
  }
}
