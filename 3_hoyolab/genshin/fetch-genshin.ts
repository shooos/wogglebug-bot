(() => {
  HoYoLAB.Genshin.fetchNewAlivals = (lastPostedId) => {
    Logger.log(`Start fetcing Genshin new alival official posts | LastPostedId=${lastPostedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=1015537`);

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

    const events = FetchOfficialEventsHelper.execute(`https://bbs-api-os.hoyolab.com/community/community_contribution/wapi/event/list?gids=2&size=20`);

    const newAlivails: HoYo.Event[] = [];
    events.some(event => {
      if (event.id == lastPostedId) return true;
      newAlivails.push(event);
    });

    Logger.log(`Finish fetcing Genshin new alival official events | EventIds=${JSON.stringify(newAlivails.map(c => c.id))}`);

    return newAlivails;
  }

  HoYoLAB.Genshin.fetchTodaysPosts = (currentDate) => {
    Logger.log(`Start fetching Genshin today's official posts | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const posts = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=1015537`);
    const yesterday = new Date(currentDate.getTime());
    yesterday.setHours(yesterday.getHours() - 24);
    const results = posts
      .filter(it =>
        it.createdAt.getTime() > yesterday.getTime()
      )
      .toReversed();

    Logger.log(`Finish fetching Genshin today's official posts | Count=${results.length}`);

    return results;
  }
})();
