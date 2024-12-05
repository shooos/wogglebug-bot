(() => {
  function genshin(token: string): void {
    const lastPostedId = HoYoLAB.Genshin.getLastPostedId();
    const newAlivails = HoYoLAB.Genshin.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.Genshin.buildMessages(newAlivails.toReversed());

    const lastPostedEventId = HoYoLAB.Genshin.getLastPostedEventId();
    const newAlivailEvents = HoYoLAB.Genshin.fetchNewAlivalEvents(lastPostedEventId);
    const eventMessages = HoYoLAB.Genshin.buildEventMessages(newAlivailEvents.toReversed());

    messages.concat(eventMessages).forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.Genshin.saveLastPostedId(newAlivails[0].id);
    if (newAlivailEvents.length) HoYoLAB.Genshin.saveLastPostedEventId(newAlivailEvents[0].id);
  }

  function zzz(token: string): void {
    const lastPostedId = HoYoLAB.ZZZ.getLastPostedId();
    const newAlivails = HoYoLAB.ZZZ.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.ZZZ.buildMessages(newAlivails.toReversed());

    messages.forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.ZZZ.saveLastPostedId(newAlivails[0].id);
  }

  function starRail(token: string): void {
    const lastPostedId = HoYoLAB.StarRail.getLastPostedId();
    const newAlivails = HoYoLAB.StarRail.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.StarRail.buildMessages(newAlivails.toReversed());

    messages.forEach(message => {
      Bsky.postMessage(token, message, Bluesky.BotType.regular);
    });

    if (newAlivails.length) HoYoLAB.StarRail.saveLastPostedId(newAlivails[0].id);
  }

  HoYoLABSubscriber.subscribe = (token) => {
    genshin(token);
    zzz(token);
    starRail(token);
  }
})();
