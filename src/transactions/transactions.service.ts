import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { BudgetService } from 'src/budget/budget.service';

export interface ItransactionData {
  budget: string;
  amount: string;
  category: string;
  description: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionRepos: Repository<TransactionEntity>,
    private budgetService: BudgetService,
  ) {}

  async save(
    txData: Omit<ItransactionData, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<boolean> {
    try {
      await this.transactionRepos.save({
        ...txData,
      });
      return this.budgetService.updateBalance(
        txData.budget,
        parseFloat(txData.amount),
      );
    } catch (error) {
      {
        throw new Error(error);
      }
    }
  }

  async findAllById(value: string): Promise<TransactionEntity[]> {
    try {
      return this.transactionRepos.find({
        relations: ['budget'],
        where: {
          budget: value,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(value: string): Promise<TransactionEntity> {
    try {
      return this.transactionRepos.findOne({
        where: {
          id: value,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
