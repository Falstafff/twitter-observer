import { compareTwoStrings } from 'string-similarity';
import { BaseCollection } from '../utils/collection';
import { Announcement } from './entities/announcement.entity';

export class AnnouncementCollection extends BaseCollection {
  protected readonly items: Announcement[];

  hasNewAnnouncements(announcement: Announcement) {
    const ANNOUNCEMENT_SIMILARITY_THRESHOLD = 0.8;

    const compareSymbols = (newSymbols, oldSymbols) =>
      newSymbols.split(',').every((symbol) => oldSymbols.includes(symbol));

    return !this.items.some(
      (oldAnnouncement) =>
        announcement.platform === oldAnnouncement.platform &&
        compareSymbols(announcement.coinSymbol, oldAnnouncement.coinSymbol) &&
        compareTwoStrings(oldAnnouncement.title, announcement.title) >
          ANNOUNCEMENT_SIMILARITY_THRESHOLD,
    );
  }
}
