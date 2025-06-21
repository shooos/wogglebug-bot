(() => {
  HoYoLAB.StarRail.fetchNewArrivals = (lastPostedId) => {
    Logger.log(`Start fetcing StarRail new alival official posts | LastPostedId=${lastPostedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=172534910`);

    const newAlivails: HoYo.Content[] = [];
    contents.some(content => {
      if (content.id == lastPostedId) return true;
      newAlivails.push(content);
    });

    Logger.log(`Finish fetcing StarRail new alival official posts | PostIds=${JSON.stringify(newAlivails.map(c => c.id))}`);

    return newAlivails;
  }

  HoYoLAB.StarRail.fetchTodaysPosts = (currentDate) => {
    Logger.log(`Start fetching StarRail today's official posts | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const posts = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=172534910`);
    const yesterday = new Date(currentDate.getTime());
    yesterday.setHours(yesterday.getHours() - 24);
    const results = posts
      .filter(it =>
        it.createdAt.getTime() > yesterday.getTime()
      )
      .toReversed();

    Logger.log(`Finish fetching StarRail today's official posts | Count=${results.length}`);

    return results;
  }
})();
