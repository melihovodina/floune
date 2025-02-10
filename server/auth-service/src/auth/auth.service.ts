import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private prismaService:PrismaService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await axios.post('http://localhost:3001/users', signUpDto).catch((error) => {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw error;
    });

    const accessToken = await this.generateTokens(user.data.id)
    
    await this.prismaService.auth.create({
      data: {
        user_id: user.data.id,
        token: accessToken
      }
    })

    return accessToken
  }

  async generateTokens(userId: number) {
    const accessToken = this.jwtService.sign({userId})
    return accessToken
  }
}
