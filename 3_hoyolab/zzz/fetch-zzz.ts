(() => {
  HoYoLAB.ZZZ.fetchNewAlivals = (lastPostedId) => {
    Logger.log(`Start fetcing ZenlessZoneZero new alival official posts | LastPostedId=${lastPostedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=219270333`);

    const newAlivails: HoYo.Content[] = [];
    contents.some(content => {
      if (content.id == lastPostedId) return true;
      newAlivails.push(content);
    });

    Logger.log(`Finish fetcing ZenlessZoneZero new alival official posts | PostIds=${JSON.stringify(newAlivails.map(c => c.id))}`);

    return newAlivails;
  }

  HoYoLAB.ZZZ.fetchTodaysPosts = (currentDate) => {
    Logger.log(`Start fetching ZZZ today's official posts | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const posts = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=219270333`);
    const results = posts
      .filter(it =>
        it.createdAt.toDateString() === currentDate.toDateString()
      )
      .toReversed();

    Logger.log(`Finish fetching ZZZ today's official posts | Count=${results.length}`);

    return results;
  }
})();
