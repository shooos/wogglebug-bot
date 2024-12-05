(() => {
  const lastFetchedReleasePostId = `LAST_FETCHED_RELEASE_POST_ID_${HoYo.Game.genshin.toUpperCase()}`;

  Genshin.propertyRepository = {
    getLastFetchedId() {
      const value = PropertiesService.getScriptProperties().getProperty(lastFetchedReleasePostId);

      if (value == null) throw new Error(`Failed to get propery | PropertyKey=${lastFetchedReleasePostId}`);

      return value;
    },

    saveLastFetchedId(value) {
      PropertiesService.getScriptProperties().setProperty(lastFetchedReleasePostId, value);
    },
  }
})();
