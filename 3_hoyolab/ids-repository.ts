(() => {
  function getLastPostedId(game: HoYo.Game): string {
    const lastPostedId = PropertiesService.getScriptProperties().getProperty(`LAST_POSTED_ID_${game.toUpperCase()}`);
    if (lastPostedId === null) {
      throw new Error(`Failed getting property of last posted id for ${game}`);
    }
    return lastPostedId;
  }

  function saveLastPostedId(game: HoYo.Game, id: string): void {
    PropertiesService.getScriptProperties().setProperty(`LAST_POSTED_ID_${game.toUpperCase()}`, id);
  }

  function getFailedPostIds(game: HoYo.Game): string[] {
    const newArrivalIdsString = PropertiesService.getScriptProperties().getProperty(`FAILD_POST_IDS_${game.toUpperCase()}`);
    if (newArrivalIdsString === null || newArrivalIdsString === '') {
      return [];
    }

    return newArrivalIdsString.split(',');
  }

  function saveFailedPostIds(game: HoYo.Game, ids: string[]): void {
    const idsString = ids.join(',');
    PropertiesService.getScriptProperties().setProperty(`FAILD_POST_IDS_${game.toUpperCase()}`, idsString);
  }

  HoYoLAB.Genshin.getLastPostedId = () => getLastPostedId(HoYo.Game.genshin);
  HoYoLAB.Genshin.saveLastPostedId = (id) => { saveLastPostedId(HoYo.Game.genshin, id) };
  HoYoLAB.Genshin.getFailedPostIds = () => getFailedPostIds(HoYo.Game.genshin);
  HoYoLAB.Genshin.saveFailedPostIds = (ids) => { saveFailedPostIds(HoYo.Game.genshin, ids) };
  HoYoLAB.Genshin.getLastPostedEventId = () => {
    const game = HoYo.Game.genshin;
    const lastPostedId = PropertiesService.getScriptProperties().getProperty(`LAST_POSTED_EVENT_ID_${game.toUpperCase()}`);
    if (lastPostedId === null) {
      throw new Error(`Failed getting property of last posted event id for ${game}`);
    }
    return lastPostedId;
  }
  HoYoLAB.Genshin.saveLastPostedEventId = (id) => {
    const game = HoYo.Game.genshin;
    PropertiesService.getScriptProperties().setProperty(`LAST_POSTED_EVENT_ID_${game.toUpperCase()}`, id);
  }

  HoYoLAB.ZZZ.getLastPostedId = () => getLastPostedId(HoYo.Game.zzz);
  HoYoLAB.ZZZ.saveLastPostedId = (id) => { saveLastPostedId(HoYo.Game.zzz, id) };
  HoYoLAB.ZZZ.getFailedPostIds = () => getFailedPostIds(HoYo.Game.zzz);
  HoYoLAB.ZZZ.saveFailedPostIds = (ids) => { saveFailedPostIds(HoYo.Game.zzz, ids) };

  HoYoLAB.StarRail.getLastPostedId = () => getLastPostedId(HoYo.Game.starRail);
  HoYoLAB.StarRail.saveLastPostedId = (id) => { saveLastPostedId(HoYo.Game.starRail, id) };
  HoYoLAB.StarRail.getFailedPostIds = () => getFailedPostIds(HoYo.Game.starRail);
  HoYoLAB.StarRail.saveFailedPostIds = (ids) => { saveFailedPostIds(HoYo.Game.starRail, ids) };
})();
