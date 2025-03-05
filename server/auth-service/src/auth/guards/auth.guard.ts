import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from "express";

export interface GuardRequest extends Request {
  userId: number
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: GuardRequest = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]

    if(!token) {
      return false
    }

    try {
      const payload = this.jwtService.verify(token)
      request.userId = payload.userId 
    } catch(error: any) {
      Logger.error(error.message)
      return false
    }
    
    return true;
  }
}
