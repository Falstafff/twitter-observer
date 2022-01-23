import { TwitterExchangesCollection } from './twitter.exchanges.collection';
import { Exchange } from '../exchanges/exchange.entity';
import { ExchangesEnum } from '../exchanges/exchanges.enum';
import { SourceEnum } from '../exchanges/source.enum';
import { CoinoneMatchTemplate } from './match.templates/coinone.match.template';
import { KrakenMatchTemplate } from './match.templates/kraken.match.template';
import { FtxMatchTemplate } from './match.templates/ftx.match.template';
import { MeMatchTemplate } from './match.templates/me.match.template';

export const twitterExchanges = new TwitterExchangesCollection([
  new Exchange(
    '1422537905885442055',
    ExchangesEnum.coinbase,
    SourceEnum.twitter,
    new CoinoneMatchTemplate(),
  ),
  new Exchange(
    '1399148563',
    ExchangesEnum.kraken,
    SourceEnum.twitter,
    new KrakenMatchTemplate(),
  ),
  new Exchange(
    '1101264495337365504',
    ExchangesEnum.ftx,
    SourceEnum.twitter,
    new FtxMatchTemplate(),
  ),
  new Exchange(
    '1101264495337365504',
    ExchangesEnum.coinone,
    SourceEnum.twitter,
    new CoinoneMatchTemplate(),
  ),
  new Exchange(
    '555860501',
    ExchangesEnum.me,
    SourceEnum.twitter,
    new MeMatchTemplate(),
  ),
]);