(() => {
  function genshin(): void {
    const lastPostedId = HoYoLAB.Genshin.getLastPostedId();
    const newAlivails = HoYoLAB.Genshin.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.Genshin.buildMessages(newAlivails.toReversed());

    const lastPostedEventId = HoYoLAB.Genshin.getLastPostedEventId();
    const newAlivailEvents = HoYoLAB.Genshin.fetchNewAlivalEvents(lastPostedEventId);
    const eventMessages = HoYoLAB.Genshin.buildEventMessages(newAlivailEvents.toReversed());

    if (!messages.length && !eventMessages.length) {
      Logger.log(`No need to notify about Genshin`);
      return;
    }

    const token = Bsky.createSession();
    messages.concat(eventMessages).forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.Genshin.saveLastPostedId(newAlivails[0].id);
    if (newAlivailEvents.length) HoYoLAB.Genshin.saveLastPostedEventId(newAlivailEvents[0].id);
  }

  function zzz(): void {
    const lastPostedId = HoYoLAB.ZZZ.getLastPostedId();
    const newAlivails = HoYoLAB.ZZZ.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.ZZZ.buildMessages(newAlivails.toReversed());

    if (!messages.length) {
      Logger.log(`No need to notify about ZZZ`);
      return;
    }

    const token = Bsky.createSession();
    messages.forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.ZZZ.saveLastPostedId(newAlivails[0].id);
  }

  function starRail(): void {
    const lastPostedId = HoYoLAB.StarRail.getLastPostedId();
    const newAlivails = HoYoLAB.StarRail.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.StarRail.buildMessages(newAlivails.toReversed());

    if (!messages.length) {
      Logger.log(`No need to notify about Star Rail`);
      return;
    }

    const token = Bsky.createSession();
    messages.forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.StarRail.saveLastPostedId(newAlivails[0].id);
  }

  HoYoLABSubscriber.subscribe = () => {
    genshin();
    zzz();
    starRail();
  }
})();
