import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // Aqui se maneja la lógica de verificación
    
    // 1.- Que se envie un token
    

    // 2.- Que sea un token valido
    return true;
  }
}