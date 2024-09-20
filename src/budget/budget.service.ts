import { Injectable, Inject } from '@nestjs/common';
import { BudgetEntity } from './budegt.entity';
import { Repository } from 'typeorm';
import { Ibudget } from './budegt.interface';

@Injectable()
export class BudgetService {
  constructor(
    @Inject('BUDGET_REPOSITORY')
    private budegtRepository: Repository<BudgetEntity>,
  ) {}

  async save(budget: Ibudget): Promise<BudgetEntity> {
    try {
      return this.budegtRepository.save(budget);
    } catch (e) {
      throw new e();
    }
  }
}
