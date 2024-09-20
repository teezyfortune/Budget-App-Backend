import { Module } from '@nestjs/common';
import { BudgetProvider } from './budget.provider';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [BudgetService],
  providers: [...BudgetProvider, BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
