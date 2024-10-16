import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from 'src/user/user.entity';

export interface ItransactionData {
  user: UserEntity;
  amount: string;
  category: string;
  type: string;
  description: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionRepos: Repository<TransactionEntity>,
  ) {}

  async save(txData: ItransactionData): Promise<TransactionEntity> {
    try {
      return this.transactionRepos.save(txData);
    } catch (error) {
      {
        throw new Error(error);
      }
    }
  }

  async findAllById(value: string): Promise<TransactionEntity[]> {
    try {
      return this.transactionRepos.find({
        relations: {
          user: true,
        },
        where: {
          user: {
            id: value,
          },
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
