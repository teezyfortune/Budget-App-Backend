import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProvider, UserService],
  controllers: [UserController],
})
export class UserModule {}
