import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private instance: DocumentClient;

  constructor(configService: ConfigService) {
    this.instance = new DynamoDB.DocumentClient({
      region: configService.get('AWS_DEFAULT_REGION'),
    });
  }

  async putItems(table: string, items: Record<any, any>[]) {
    try {
      await this.instance
        .batchWrite(DatabaseService.mapBatchWrite(table, items))
        .promise();
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  async scanItems(tableName): Promise<any[]> {
    let items = [];

    try {
      const response = await this.instance
        .scan({
          TableName: tableName,
        })
        .promise();

      items = response.Items;
    } catch (e) {
      console.error(e);
    }

    return items;
  }

  private static mapBatchWrite(tableName, items) {
    return {
      RequestItems: {
        [tableName]: items.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    };
  }
}
