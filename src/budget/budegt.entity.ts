import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  VersionColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TransactionEntity } from 'src/transactions/transaction.entity';

@Entity('budgets')
export class BudgetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (tx) => tx.budget)
  transactions: TransactionEntity[];

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @Column({ name: 'balance', type: 'decimal', precision: 10, scale: 2 })
  balance: string;

  @VersionColumn({ name: 'version' })
  version: string;

  @Column({ name: 'month_year' })
  monthAndYear: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
