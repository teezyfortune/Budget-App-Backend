import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';
import { UserEntity } from 'src/user/user.entity';
export class CreateBudgetDto {
  @IsNumber()
  @IsNotEmpty()
  amount: string;
  @IsString()
  @IsNotEmpty()
  categoryId: CategoryEntity;
  @IsString()
  @IsNotEmpty()
  user: UserEntity;
  @IsString()
  @IsNotEmpty()
  monthAndYear: string;
}
