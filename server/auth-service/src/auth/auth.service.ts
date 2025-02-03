import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService:PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    
  }
}
