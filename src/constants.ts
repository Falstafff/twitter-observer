export const REGEX = {
  $_SYMBOL: /\$[A-Z0-9]+/, // $BTC
  COIN_SYMBOL: /\(([A-Z0-9]+)\)/g, // (BTC)
};

export enum AnnouncementTypes {
  listing = 'coin-listing',
  supports = 'supports'
}
