import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers['authorization']){
      throw new UnauthorizedException('El Token no ha sido enviado');
    }

    const token = request.headers['authorization'].split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('El Token no ha sido enviado');
    }
    try{
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, {secret});
      request.user = payload;
      return true;
    }catch(err){
      throw new UnauthorizedException('Token invalido');
    }
  }
}
