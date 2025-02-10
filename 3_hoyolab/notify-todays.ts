(() => {
  function genshin(currentDate: Date): void {
    const todaysPosts = HoYoLAB.Genshin.fetchTodaysPosts!(currentDate);
    const message = HoYoLAB.Genshin.buildSummaryMessage!(todaysPosts.toReversed());

    if (!message) {
      Logger.log(`No need to notify about Genshin`);
      return;
    }

    const token = Bsky.createSession!();
    Bsky.postMessage!(token, message, Bluesky.BotType.regular);
  }

  function zzz(currentDate: Date): void {
    const todaysPosts = HoYoLAB.ZZZ.fetchTodaysPosts!(currentDate);
    const message = HoYoLAB.ZZZ.buildSummaryMessage!(todaysPosts.toReversed());

    if (!message) {
      Logger.log(`No need to notify about ZZZ`);
      return;
    }

    const token = Bsky.createSession!();
    Bsky.postMessage!(token, message, Bluesky.BotType.regular);
  }

  function starRail(currentDate: Date): void {
    const todaysPosts = HoYoLAB.StarRail.fetchTodaysPosts!(currentDate);
    const message = HoYoLAB.StarRail.buildSummaryMessage!(todaysPosts.toReversed());

    if (!message) {
      Logger.log(`No need to notify about StarRail`);
      return;
    }

    const token = Bsky.createSession!();
    Bsky.postMessage!(token, message, Bluesky.BotType.regular);
  }

  HoYoLABSubscriber.notifyTodays = (currentDate) => {
    genshin(currentDate);
    zzz(currentDate);
    starRail(currentDate);
  }
})();
