export const REGEX = {
  $_SYMBOL: /\$[A-Z0-9]+/, // $BTC
  COIN_SYMBOL: /\(([^)]+)\)/g, // (BTC)
};

export enum AnnouncementTypes {
  listing = 'coin-listing',
}
