import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  coinSymbol: string;

  @Column()
  link: string;

  @Column()
  platform: string;

  @Column()
  source: string;

  @Column()
  type: string;

  @Column()
  detectionDate: string;

  @Column()
  showDate: string;
}
