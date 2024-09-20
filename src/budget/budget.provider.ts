import { DataSource } from 'typeorm';
import { BudgetEntity } from '../budget/budegt.entity';

export const BudgetProvider = [
  {
    provide: 'BUDGET_REPOSITORY',

    useFactory: (datasource: DataSource) =>
      datasource.getRepository(BudgetEntity),
    inject: ['DATA_SOURCE'],
  },
];
