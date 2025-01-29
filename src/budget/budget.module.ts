import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BudgetProvider } from './budget.provider';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';
import { BudgetMiddleWare } from './budget.middleware';
import { Authmiddleware } from 'src/auth/auth.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, HelperModule, UserModule],
  exports: [BudgetService],
  providers: [...BudgetProvider, BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authmiddleware, BudgetMiddleWare)
      .forRoutes({ path: '/budget', method: RequestMethod.ALL });
  }
}
