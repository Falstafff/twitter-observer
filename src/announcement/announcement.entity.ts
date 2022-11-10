import { v4 as uuid } from 'uuid';

export class Announcement {
  public id;
  public coinSymbol;
  public createdAt;
  public href;
  public isInitial;
  public platform;
  public source;
  public title;
  public type;

  constructor() {
    this.id = uuid();
  }
}
