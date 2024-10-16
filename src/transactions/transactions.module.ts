import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './transactions';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [TransactionsService],
  providers: [...Transactions, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
