import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { BudgetEntity } from 'src/budget/budegt.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BudgetEntity, (bdg) => bdg.id)
  @JoinColumn({ name: 'budget_id' })
  budget: string;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @OneToOne(() => CategoryEntity, (cat) => cat.id)
  @JoinColumn({ name: 'category_id' })
  cateogryId: string;

  @Column({ name: 'description' })
  description: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
