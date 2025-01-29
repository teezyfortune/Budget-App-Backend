import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryProvider } from './category';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { Authmiddleware } from 'src/auth/auth.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  exports: [CategoryService],
  providers: [...CategoryProvider, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authmiddleware)
      .forRoutes({ path: 'category', method: RequestMethod.ALL });
  }
}
