import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BudgetEntity } from './budegt.entity';
import { Repository } from 'typeorm';
import { Ibudget } from './budegt.interface';

// todo - request scope: call providers in injection scopes
@Injectable()
export class BudgetService {
  constructor(
    @Inject('BUDGET_REPOSITORY')
    private budegtRepository: Repository<BudgetEntity>,
  ) {}

  async save(budget: Ibudget): Promise<BudgetEntity> {
    try {
      return this.budegtRepository.save({
        ...budget,
        user: budget.user,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOneById(id: string): Promise<BudgetEntity> {
    try {
      return this.budegtRepository.findOne({ where: { id } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateBalance(id: string, amount: number): Promise<boolean> {
    const budget = await this.findOneById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    budget.balance = (parseFloat(budget.balance) - amount).toFixed(2);
    budget.version = budget.version + 1;
    await this.budegtRepository.save(budget);
    return true;
  }
}
