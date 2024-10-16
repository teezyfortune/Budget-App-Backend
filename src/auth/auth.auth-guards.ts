import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject() private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const user = this.authService.verifyToken(token);
    console.log(user);
    if (!user) {
      throw new Error('Unauthorized');
    }
    request.user = user;
    return true;
  }
}
