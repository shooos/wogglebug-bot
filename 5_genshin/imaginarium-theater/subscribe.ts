(() => {
  Genshin.imaginariumTheater!.subscribe = () => {
    Logger.log(`Start subscribing Genshin Imaginarium Theater information`);

    const lastFetchedId = Genshin.propertyRepository!.getLastFetchedId();
    const releases = Genshin.fetchReleases!(lastFetchedId);

    releases.forEach((release) => {
      const infos = Genshin.imaginariumTheater!.extractInfo!(release);

      infos.forEach((info) => {
        Genshin.imaginariumTheater!.save!(info);
      });
    });

    if (releases.length) Genshin.propertyRepository!.saveLastFetchedId(releases[0].id);

    Logger.log(`Finish subscribing Genshin Imaginarium Theater information`);
  }
})();
