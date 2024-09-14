import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProvider } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { Helper } from '../helper/helper.provider';

@Module({
  imports: [DatabaseModule],
  exports: [UserService],
  providers: [...UserProvider, UserService, Helper],
  controllers: [UserController],
})
export class UserModule {}
