import { Module } from '@nestjs/common';
import { TodoService } from './dynamo-db.service';
import { DynamoDbProvider } from './dynamo-db.provider';
import { TodoController } from '../dynamo-db/dynamo-db-controller';

@Module({
  providers: [TodoService, DynamoDbProvider],
  exports: [TodoService],
  controllers: [TodoController],
})
export class DynamoDbModule {}
