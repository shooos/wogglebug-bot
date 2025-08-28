(() => {
  Videos.getLastCheckedPublishedAt = () => {
    const value: string | null = PropertiesService
      .getScriptProperties()
      .getProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`);

    return value ? new Date(value) : new Date();
  }

  Videos.saveLastCheckedPublishedAt = (value: Date) => {
    PropertiesService
      .getScriptProperties()
      .setProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`, Utils.formatDateToIsoString(value));
  }
})();
