(() => {
  HoYoLAB.Genshin.fetchNewAlivals = (lastPostedId) => {
    Logger.log(`Start fetcing Genshin new alival official posts | LastPostedId=${lastPostedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=15&uid=1015537`);

    const newAlivails: HoYo.Content[] = [];
    contents.some(content => {
      if (content.id == lastPostedId) return true;
      newAlivails.push(content);
    });

    Logger.log(`Finish fetcing Genshin new alival official posts | PostIds=${JSON.stringify(newAlivails.map(c => c.id))}`);

    return newAlivails;
  }

  HoYoLAB.Genshin.fetchNewAlivalEvents = (lastPostedId) => {
    Logger.log(`Start fetcing Genshin new alival official events | LastPostedId=${lastPostedId}`);

    const events = FetchOfficialEventsHelper.execute(`https://bbs-api-os.hoyolab.com/community/community_contribution/wapi/event/list?gids=2&size=15`);

    const newAlivails: HoYo.Event[] = [];
    events.some(event => {
      if (event.id == lastPostedId) return true;
      newAlivails.push(event);
    });

    Logger.log(`Finish fetcing Genshin new alival official events | EventIds=${JSON.stringify(newAlivails.map(c => c.id))}`);

    return newAlivails;
  }
})();
