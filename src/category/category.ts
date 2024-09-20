import { DataSource } from 'typeorm';
import { CategoryEntity } from './category.entity';

export const CategoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',

    useFactory: (datasource: DataSource) =>
      datasource.getRepository(CategoryEntity),
    inject: ['DATA_SOURCE'],
  },
];
