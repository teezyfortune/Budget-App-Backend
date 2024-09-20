import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryProvider } from './category';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [CategoryService],
  providers: [...CategoryProvider, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
