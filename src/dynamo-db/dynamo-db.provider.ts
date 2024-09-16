import { Provider } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, marshallOptions } from '@aws-sdk/lib-dynamodb';

const marshallOptions: marshallOptions = {
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
  convertEmptyValues: true,
  convertTopLevelContainer: true,
};
const client = new DynamoDBClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export const ddbDocumentClient = DynamoDBDocumentClient.from(client, {
  marshallOptions,
});
export const DynamoDbProvider: Provider = {
  provide: 'DYNAMODB_CLIENT',
  useFactory: () => {
    return ddbDocumentClient;
  },
};
