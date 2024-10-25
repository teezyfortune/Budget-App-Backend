import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './transactions';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  exports: [TransactionsService],
  providers: [...Transactions, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
