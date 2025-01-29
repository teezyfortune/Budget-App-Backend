import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './transactions';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { BudgetModule } from 'src/budget/budget.module';
import { Authmiddleware } from 'src/auth/auth.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, BudgetModule, UserModule],
  exports: [TransactionsService],
  providers: [...Transactions, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authmiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.ALL });
  }
}
