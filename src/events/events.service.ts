import { Injectable, Logger } from '@nestjs/common';
import { CoinEntitiesCollection } from '../listing/coin.entities.collection';
import { EventBridge } from 'aws-sdk';
import { PutEventsRequest } from 'aws-sdk/clients/eventbridge';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
  private eventBridge: EventBridge;

  constructor(private configService: ConfigService) {
    this.eventBridge = new EventBridge({
      region: configService.get('AWS_DEFAULT_REGION'),
    });
  }

  async putImportantNewsEvent(collection: CoinEntitiesCollection) {
    const source = 'notify.importantNews';
    const params: PutEventsRequest = {
      Entries: [
        {
          Source: source,
          Detail: JSON.stringify({ news: collection.getItems() }),
          DetailType: 'FoundImportantNews',
        },
      ],
    };

    try {
      this.handleEventsResponse(
        source,
        await this.eventBridge.putEvents(params).promise(),
      );
    } catch (e) {
      Logger.error(e);
    }
  }

  handleEventsResponse(source, response) {
    const { FailedEntryCount, Entries } = response;

    if (FailedEntryCount > 0) {
      const { ErrorCode, ErrorMessage } = Entries[0];
      Logger.error(`${source}: ${ErrorCode}_${ErrorMessage}`);
    }
  }
}
