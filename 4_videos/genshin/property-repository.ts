(() => {
  Videos.getLastCheckedPublishedAt = () => {
    const value = PropertiesService
      .getScriptProperties()
      .getProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`);

    return new Date(value);
  }

  Videos.saveLastCheckedPublishedAt = (value: Date) => {
    PropertiesService
      .getScriptProperties()
      .setProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`, Utils.formatDateToIsoString(value));
  }
})();
