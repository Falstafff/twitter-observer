import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ListingService } from './listing.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [ListingService],
  exports: [ListingService],
})
export class ListingModule {}
