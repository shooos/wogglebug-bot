(() => {
  function postMessages(messages: Bluesky.Message[]): boolean {
    try {
      const token = Bsky.createSession!();
      const results = messages.map(message => Bsky.postMessage!(token, message, Bluesky.BotType.regular));
      const failedCount = results.filter(result => result !== Bluesky.Result.success).length;

      if (failedCount > 0) {
        Utils.error(`Failed posting HoYoLAB messages | FailedCount=${failedCount}, TotalCount=${messages.length}`);
        return false;
      }

      return true;
    } catch (error) {
      Utils.error(`Failed posting HoYoLAB messages | Error=${error}`);
      return false;
    }
  }

  function genshin(): void {
    const lastPostedId = HoYoLAB.Genshin.getLastPostedId!();
    const newArrivals = HoYoLAB.Genshin.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.Genshin.buildMessages!(newArrivals.toReversed());

    const lastPostedEventId = HoYoLAB.Genshin.getLastPostedEventId!();
    const newArrivalEvents = HoYoLAB.Genshin.fetchNewArrivalEvents!(lastPostedEventId);
    const eventMessages = HoYoLAB.Genshin.buildEventMessages!(newArrivalEvents.toReversed());

    if (!messages.length && !eventMessages.length) {
      Utils.info(`No need to notify about Genshin`);
      return;
    }

    if (!postMessages(messages.concat(eventMessages))) return;

    if (newArrivals.length) HoYoLAB.Genshin.saveLastPostedId!(newArrivals[0].id);
    if (newArrivalEvents.length) HoYoLAB.Genshin.saveLastPostedEventId!(newArrivalEvents[0].id);
  }

  function zzz(): void {
    const lastPostedId = HoYoLAB.ZZZ.getLastPostedId!();
    const newArrivals = HoYoLAB.ZZZ.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.ZZZ.buildMessages!(newArrivals.toReversed());

    if (!messages.length) {
      Utils.info(`No need to notify about ZZZ`);
      return;
    }

    if (!postMessages(messages)) return;

    if (newArrivals.length) HoYoLAB.ZZZ.saveLastPostedId!(newArrivals[0].id);
  }

  function starRail(): void {
    const lastPostedId = HoYoLAB.StarRail.getLastPostedId!();
    const newArrivals = HoYoLAB.StarRail.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.StarRail.buildMessages!(newArrivals.toReversed());

    if (!messages.length) {
      Utils.info(`No need to notify about Star Rail`);
      return;
    }

    if (!postMessages(messages)) return;

    if (newArrivals.length) HoYoLAB.StarRail.saveLastPostedId!(newArrivals[0].id);
  }

  HoYoLABSubscriber.subscribe = () => {
    genshin();
    zzz();
    starRail();
  }
})();



