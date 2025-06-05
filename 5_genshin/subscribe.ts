(() => {
  Genshin.subscribe = () => {
    Logger.log(`Start subscribing Genshin information`);

    const lastFetchedId = Genshin.propertyRepository!.getLastFetchedId();
    const releases = Genshin.fetchReleases!(lastFetchedId);

    releases.forEach((release) => {
      const imaginariumTheaterInfo = Genshin.imaginariumTheater!.extractInfo!(release);

      imaginariumTheaterInfo.forEach((info) => {
        Genshin.imaginariumTheater!.save!(info);
      });

      const spiralAbyssInfo = Genshin.spiralAbyss!.extractInfo!(release);

      spiralAbyssInfo.forEach(info => {
        Genshin.spiralAbyss!.save!(info);
      })
    });

    if (releases.length) Genshin.propertyRepository!.saveLastFetchedId(releases[0].id);

    Logger.log(`Finish subscribing Genshin information`);
  }
})();
