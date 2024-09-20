import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async save(data: CategoryEntity): Promise<CategoryEntity> {
    try {
      const result = await this.categoryRepository.save(data);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}
