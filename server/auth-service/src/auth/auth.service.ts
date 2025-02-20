import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService:PrismaService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await axios.post('http://localhost:3001', signUpDto).catch((error) => {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw error;
    });

    return await this.generateTokens(user.data.id, user.data.username, true)
  }

  async login(signInDto: SignInDto) {
    const user = await axios.get('http://localhost:3001', {
      params: { name: signInDto.username }
    }).catch((error) => {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw error;
    });

    if(!user) {
      throw new UnauthorizedException('Email or password is incorrect')
    }

    const isPasswordMatch = await bcrypt.compare(signInDto.password, user.data.password)
    if(!isPasswordMatch) {
      throw new UnauthorizedException('Email or password is incorrect')
    }

    return await this.generateTokens(user.data.id, user.data.username, false)
  }

  async refresh(refreshToken: string) {
    const isTokenValid = await this.prismaService.auth.findUnique({
      where: {token: refreshToken}
    })

    if(!isTokenValid) {
      throw new UnauthorizedException('Refresh token is invalid')
    }
  }

  async generateTokens(userId: number, username: string, isNewUser: boolean) {
    const payload = {
      userId: userId,
      username: username
    } 

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h'
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '15d'
    })

    if(isNewUser) {
      await this.prismaService.auth.create({
        data: {
          user_id: userId,
          token: refreshToken
        }
    })
    } else {
      await this.prismaService.auth.update({
        where: {
          user_id: userId
        },
        data: {
          token: refreshToken
        }
      })
    }

    return {
      accessToken,
      refreshToken
    }
  }
}
