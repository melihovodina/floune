import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const response = await this.authService.signUp(signUpDto)
      return response
    } catch (error) {
      throw error
    }
  }

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    try {
      const response = await this.authService.login(signInDto)
      return response
    } catch (error) {
      throw error
    }
  }

  @Post('refresh')
  async refresh(@Body() refreshToken: string) {
    try {
      const response = await this.authService.refresh(refreshToken)
      return response
    } catch (error) {
      throw error
    }
  }
}
