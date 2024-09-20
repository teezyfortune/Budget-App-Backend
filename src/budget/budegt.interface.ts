import { CategoryEntity } from 'src/category/category.entity';
import { UserEntity } from 'src/user/user.entity';

export interface Ibudget {
  amount: string;
  categoryId: CategoryEntity;
  monthAndYear: string;
  user: UserEntity;
}
