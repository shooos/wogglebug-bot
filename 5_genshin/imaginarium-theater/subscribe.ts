(() => {
  Genshin.imaginariumTheater.subscribe = () => {
    Logger.log(`Start subscribing Genshin Imaginarium Theater informations`);
    const lastFetchedId = Genshin.propertyRepository.getLastFetchedId();
    const releases = Genshin.fetchReleases(lastFetchedId);

    releases.forEach((release) => {
      const infos = Genshin.imaginariumTheater.extractInfo(release);

      infos.forEach((info) => {
        Genshin.imaginariumTheater.save(info);
      });
    });
  }
})();
