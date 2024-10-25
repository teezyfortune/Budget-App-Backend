import { UserEntity } from 'src/user/user.entity';

export interface Ibudget {
  amount: string;
  monthAndYear: string;
  user: UserEntity;
}
