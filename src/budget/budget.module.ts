import { Module } from '@nestjs/common';
import { BudgetProvider } from './budget.provider';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [DatabaseModule, AuthModule, HelperModule],
  exports: [BudgetService],
  providers: [...BudgetProvider, BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
