(() => {
  Genshin.fetchReleases = (lastFetchedId) => {
    Logger.log(`Start fetching Genshin releases posts | LastFetchedId=${lastFetchedId}`);

    const contents = FetchOfficialPostsHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/userPost?size=15&uid=1015537`);

    const newReleases: Genshin.ReleasePost[] = [];
    contents
      .filter(it => it.subject.includes('正式リリース'))
      .some(content => {
        if (content.id === lastFetchedId) return true;
        newReleases.push({
          id: content.id,
          body: content.body,
        });
      });

    Logger.log(`Success fetching Genshin releases posts | Posts=${JSON.stringify(newReleases.map(it => it.id))}`);

    return newReleases.toReversed();
  }
})();
