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
import { IUserResponse } from './interfaces/user.interfaces';

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

  @Column()
  salt: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  static FromUser(user: UserEntity): IUserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
  static FromUserWithPassWord(user: UserEntity): IUserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }
}
