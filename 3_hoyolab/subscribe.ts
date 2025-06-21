(() => {
  function genshin(): void {
    const lastPostedId = HoYoLAB.Genshin.getLastPostedId!();
    const newArrivals = HoYoLAB.Genshin.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.Genshin.buildMessages!(newArrivals.toReversed());

    const lastPostedEventId = HoYoLAB.Genshin.getLastPostedEventId!();
    const newArrivalEvents = HoYoLAB.Genshin.fetchNewArrivalEvents!(lastPostedEventId);
    const eventMessages = HoYoLAB.Genshin.buildEventMessages!(newArrivalEvents.toReversed());

    if (!messages.length && !eventMessages.length) {
      Logger.log(`No need to notify about Genshin`);
      return;
    }

    const token = Bsky.createSession!();
    messages.concat(eventMessages).forEach(message => {
      Bsky.postMessage!(token, message, Bluesky.BotType.regular);
    });

    if (newArrivals.length) HoYoLAB.Genshin.saveLastPostedId!(newArrivals[0].id);
    if (newArrivalEvents.length) HoYoLAB.Genshin.saveLastPostedEventId!(newArrivalEvents[0].id);
  }

  function zzz(): void {
    const lastPostedId = HoYoLAB.ZZZ.getLastPostedId!();
    const newArrivals = HoYoLAB.ZZZ.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.ZZZ.buildMessages!(newArrivals.toReversed());

    if (!messages.length) {
      Logger.log(`No need to notify about ZZZ`);
      return;
    }

    const token = Bsky.createSession!();
    messages.forEach(message => {
      Bsky.postMessage!(token, message, Bluesky.BotType.regular);
    });

    if (newArrivals.length) HoYoLAB.ZZZ.saveLastPostedId!(newArrivals[0].id);
  }

  function starRail(): void {
    const lastPostedId = HoYoLAB.StarRail.getLastPostedId!();
    const newArrivals = HoYoLAB.StarRail.fetchNewArrivals!(lastPostedId);
    const messages = HoYoLAB.StarRail.buildMessages!(newArrivals.toReversed());

    if (!messages.length) {
      Logger.log(`No need to notify about Star Rail`);
      return;
    }

    const token = Bsky.createSession!();
    messages.forEach(message => {
      Bsky.postMessage!(token, message, Bluesky.BotType.regular);
    });

    if (newArrivals.length) HoYoLAB.StarRail.saveLastPostedId!(newArrivals[0].id);
  }

  HoYoLABSubscriber.subscribe = () => {
    genshin();
    zzz();
    starRail();
  }
})();
