import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn: '60s'}
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
