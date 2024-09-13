import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserResponse } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: IUser): Promise<IUserResponse> {
    const result = await this.userRepository.save(data);

    return UserEntity.FromUser(result);
  }
}
