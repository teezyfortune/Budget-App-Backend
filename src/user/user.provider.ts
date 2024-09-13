import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';

export const UserProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
