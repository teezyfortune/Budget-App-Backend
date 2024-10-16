import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserResponse } from './interfaces/user.interfaces';
import { Helper } from '../helper/helper.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
    private helper: Helper,
  ) {}

  async save(data: IUser): Promise<IUserResponse> {
    try {
      const password = await this.helper.hashPassword(data.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: plainPassword, ...rest } = data;
      const result = await this.userRepository.save({
        ...rest,
        password: password.hash,
        ...password,
      });

      return UserEntity.FromUser(result);
    } catch (e) {
      throw new Error(e);
    }
  }
  async findOne(
    email: string,
    withPassword?: boolean,
  ): Promise<IUserResponse | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      if (withPassword) {
        return UserEntity.FromUserWithPassWord(user);
      }
      return UserEntity.FromUser(user);
    } catch (e) {
      throw new Error(e);
    }
  }
}
