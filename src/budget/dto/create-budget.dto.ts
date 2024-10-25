import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
export class CreateBudgetDto {
  @IsNumber()
  @IsNotEmpty()
  amount: string;
  @IsString()
  @IsNotEmpty()
  user: UserEntity;
  @IsString()
  @IsNotEmpty()
  monthAndYear: string;
}
