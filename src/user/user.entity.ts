import { BudgetEntity } from 'src/budget/budegt.entity';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username' })
  username: string;

  @OneToMany(() => BudgetEntity, (b) => b.user)
  budgets: BudgetEntity[];

  @OneToMany(() => TransactionEntity, (tx) => tx.user)
  transactions: TransactionEntity[];

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
