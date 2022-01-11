export class Tweet {
  private readonly tweet: any;

  constructor(tweet: any) {
    this.tweet = tweet;
  }

  isExtendedTweet(tweet) {
    return !!tweet?.extended_tweet;
  }

  get text() {
    return this.isExtendedTweet(this.tweet)
      ? this.tweet.extended_tweet.full_text
      : this.tweet.text;
  }

  get href() {
    return '';
  }

  get userId() {
    return this?.tweet?.user?.id;
  }
}
