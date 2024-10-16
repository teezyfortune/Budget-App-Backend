import { DataSource } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

export const Transactions = [
  {
    provide: 'TRANSACTIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TransactionEntity),

    inject: ['DATA_SOURCE'],
  },
];
