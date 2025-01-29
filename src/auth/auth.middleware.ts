import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Authmiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const user = await this.authService.verifyToken(token);
        const isValidUser = await this.userService.findOneBy({ id: user.sub });

        if (isValidUser) {
          req.user = user;

          return next();
        }
        throw new UnauthorizedException({
          staus: 'Fail',
          message: 'Invalid authorization token',
        });
      }

      throw new UnauthorizedException({
        staus: 'Fail',
        message: 'Invalid authorization token',
      });
    } catch (e: any) {
      if (e instanceof UnauthorizedException) throw e;
      throw new InternalServerErrorException(e.message);
    }
  }
}
