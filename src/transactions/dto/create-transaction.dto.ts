import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
