import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUserResponse } from 'src/user/interfaces/user.interfaces';
import { Helper } from '../helper/helper.provider';
import { JwtService } from '@nestjs/jwt';
import { IjwtExpiresInsOption } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private helper: Helper,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUserResponse> {
    try {
      const user = await this.usersService.findOne(email, true);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (this.isUserWithPassword(user)) {
        const isPasswordMatch = await this.helper.comparePassword(
          pass,
          user.password,
        );
        if (!isPasswordMatch) {
          throw new UnauthorizedException({
            message: 'Invalid credentials',
            status: 401,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async login(user: IUserResponse) {
    const payload = { email: user.email, sub: user.id };
    return {
      data: user,
      token: this.getUserToken(payload),
    };
  }
  private signToken(payload: any, options: IjwtExpiresInsOption): string {
    return this.jwtService.sign(payload, options);
  }
  private getUserToken(payload: any) {
    return {
      accessToken: this.signToken(payload, { expiresIn: '1d' }),
      refreshToken: this.signToken(payload, { expiresIn: '1d' }),
    };
  }

  public verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  private isUserWithPassword(user: IUserResponse): user is IUserResponse {
    return (user as IUserResponse).password !== undefined;
  }
}
