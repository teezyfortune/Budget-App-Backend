import { UserEntity } from 'src/user/user.entity';

export interface Ibudget {
  amount: number;
  monthAndYear: string;
  user: UserEntity;
}
