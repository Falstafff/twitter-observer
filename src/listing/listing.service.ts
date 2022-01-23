import { Injectable } from '@nestjs/common';
import { CoinEntitiesCollection } from './coin.entities.collection';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListingService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService,
  ) {}

  async addImportantNews(collection: CoinEntitiesCollection) {
    return this.databaseService.putItems(
      `AnnouncementsTable-${this.configService.get('APP_STAGE')}`,
      collection.getItems(),
    );
  }

  async getAllCoinListings(): Promise<CoinEntitiesCollection> {
    return CoinEntitiesCollection.fromArray(
      await this.databaseService.scanItems(
        `AnnouncementsTable-${this.configService.get('APP_STAGE')}`,
      ),
    );
  }
}
