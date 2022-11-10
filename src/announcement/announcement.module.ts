import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [AnnouncementService],
  controllers: [],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
