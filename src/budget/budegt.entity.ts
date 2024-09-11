import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@Entity('transactions')
export class BudgetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserEntity, (user) => user.budgets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => CategoryEntity, (cat) => cat.id)
  @JoinColumn({ name: 'catgory_id' })
  categoryId: CategoryEntity;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @Column({ name: 'month_and_year' })
  monthAndYear: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
