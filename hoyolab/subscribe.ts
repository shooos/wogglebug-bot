(() => {
  const accessJwt = Bsky.createSession();

  function genshin(): void {
    const lastPostedId = HoYoLAB.Genshin.getLastPostedId();
    const newAlivails = HoYoLAB.Genshin.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.Genshin.buildMessages(newAlivails.reverse());

    const lastPostedEventId = HoYoLAB.Genshin.getLastPostedEventId();
    const newAlivailEvents = HoYoLAB.Genshin.fetchNewAlivalEvents(lastPostedEventId);
    const eventMessages = HoYoLAB.Genshin.buildEventMessages(newAlivailEvents.reverse());

    messages.concat(eventMessages).forEach(message => {
      Bsky.postMessage(accessJwt, message, Bluesky.BotType.regular);
    });
  }

  function zzz(): void {
    const lastPostedId = HoYoLAB.ZZZ.getLastPostedId();
    const newAlivails = HoYoLAB.ZZZ.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.ZZZ.buildMessages(newAlivails.reverse());

    messages.forEach(message => {
      Bsky.postMessage(accessJwt, message, Bluesky.BotType.regular);
    });
  }

  function starRail(): void {
    const lastPostedId = HoYoLAB.StarRail.getLastPostedId();
    const newAlivails = HoYoLAB.StarRail.fetchNewAlivals(lastPostedId);
    const messages = HoYoLAB.StarRail.buildMessages(newAlivails.reverse());

    messages.forEach(message => {
      Bsky.postMessage(accessJwt, message, Bluesky.BotType.regular);
    });
  }

  HoYoLABSubscriber.subscribe = () => {
    genshin();
    zzz();
    starRail();
  }
})();
