import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Announcement } from './announcement.entity';
import { AnnouncementCollection } from './announcement.collection';
import { Cache } from 'cache-manager';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AnnouncementService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    private readonly database: DatabaseService,
  ) {}

  public async create(announcements: Announcement[]): Promise<boolean> {
    const isCreated: boolean = await this.database.putItems(
      'AnnouncementsTable-prod',
      announcements,
    );

    if (isCreated) {
      await this.cache.set('announcements', [
        ...announcements,
        (await this.cache.get('announcements')) ?? [],
      ]);
    }

    return isCreated;
  }

  public async isNewAnnouncement(announcement: Announcement): Promise<boolean> {
    let announcements: Announcement[] = await this.cache.get('announcements');

    if (!announcements) {
      announcements = await this.database.scanItems('AnnouncementsTable-prod');
      await this.cache.set('announcements', announcements);
    }

    return new AnnouncementCollection(announcements).hasNewAnnouncements(
      announcement,
    );
  }
}
