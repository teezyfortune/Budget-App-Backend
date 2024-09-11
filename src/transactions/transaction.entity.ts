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
import { UserEntity } from '../user/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @OneToOne(() => CategoryEntity, (cat) => cat.id)
  @JoinColumn({ name: 'category_id' })
  cateogryId: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'description' })
  description: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
