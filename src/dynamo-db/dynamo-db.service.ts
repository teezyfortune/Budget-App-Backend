import { Injectable, Inject } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { IAddTodo } from './dynamo-db.interface';
import * as uuV4 from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @Inject('DYNAMODB_CLIENT')
    private dynamodbCleint: DynamoDBDocumentClient,
  ) {}

  async createItem(params: IAddTodo): Promise<any> {
    return this.dynamodbCleint.send(
      new PutCommand({
        TableName: 'Todo',
        Item: {
          partKey: uuV4.v4(),
          tile: params.title,
          description: params.description,
          done: params.done,
        },
      }),
    );
  }

  async getItem(id: string): Promise<any> {
    // const client = this.putcommand.
    return this.dynamodbCleint.send(
      new GetCommand({
        TableName: 'users',
        Key: {
          id: id,
        },
      }),
    );
  }

  async updateItem(params: any): Promise<any> {
    const client = new UpdateCommand({
      TableName: 'users',
      Key: {
        id: params.id,
      },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
    });
    return this.dynamodbCleint.send(client);
  }
}
