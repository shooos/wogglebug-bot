(() => {
  HoYoLAB.ZZZ.fetchNewArrivals = (lastPostedId) => {
    Utils.log(`Start fetching ZenlessZoneZero new arrival official posts | LastPostedId=${lastPostedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=219270333`);

    const newArrivals: HoYo.Content[] = [];
    contents.some(content => {
      if (content.id == lastPostedId) return true;
      newArrivals.push(content);
    });

    Utils.log(`Finish fetching ZenlessZoneZero new arrival official posts | PostIds=${JSON.stringify(newArrivals.map(c => c.id))}`);

    return newArrivals;
  }

  HoYoLAB.ZZZ.fetchTodaysPosts = (currentDate) => {
    Utils.log(`Start fetching ZZZ today's official posts | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const posts = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=20&uid=219270333`);
    const yesterday = new Date(currentDate.getTime());
    yesterday.setHours(yesterday.getHours() - 24);
    const results = posts
      .filter(it =>
        it.createdAt.getTime() > yesterday.getTime()
      )
      .toReversed();

    Utils.log(`Finish fetching ZZZ today's official posts | Count=${results.length}`);

    return results;
  }
})();


