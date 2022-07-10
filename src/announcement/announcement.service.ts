import { Injectable } from '@nestjs/common';
import { Announcement } from './entities/announcement.entity';
import { AnnouncementCollection } from './announcement.collection';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
  ) {}

  bulkCreate(collection: AnnouncementCollection) {
    const announcements = this.announcementRepository.create(
      collection.getItems(),
    );

    return this.announcementRepository.save(announcements);
  }

  async isNewAnnouncement(announcement: Announcement): Promise<boolean> {
    const announcements = new AnnouncementCollection(
      await this.announcementRepository.findBy({
        platform: announcement.platform,
        type: announcement.type,
      }),
    );

    return announcements.hasNewAnnouncements(announcement);
  }
}
