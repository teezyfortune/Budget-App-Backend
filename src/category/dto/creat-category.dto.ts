import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  user: string;
}
