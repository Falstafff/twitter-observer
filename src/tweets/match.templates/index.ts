import { KrakenMatchTemplate } from './kraken.match.template';
import { CoinoneMatchTemplate } from './coinone.match.template';
import { FtxMatchTemplate } from './ftx.match.template';
import { MeMatchTemplate } from './me.match.template';
import { CoinbaseMatchTemplate } from './coinbase.match.template';

export const MATCH_TEMPLATES = {
  ftx: new FtxMatchTemplate(),
  kraken: new KrakenMatchTemplate(),
  coinone: new CoinoneMatchTemplate(),
  coinbase: new CoinbaseMatchTemplate(),
  me: new MeMatchTemplate(),
};
