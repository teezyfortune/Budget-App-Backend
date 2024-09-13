import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/creat-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUser(createUserDto);
      return res
        .status(201)
        .json({ status: 'success', message: 'User created successfully' });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(HttpStatus.CONFLICT).json({
          status: HttpStatus.CONFLICT,
          message: 'User already exists',
        });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ statusCode: 500, message: 'Internal Sserver Error' });
    }
  }
}
