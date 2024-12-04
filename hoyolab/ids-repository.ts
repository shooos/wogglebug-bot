(() => {
  const Game = {
    genshin: 'genshin',
    zzz: 'zzz',
    starRail: 'starRail',
  } as const;
  type Game = (typeof Game)[keyof typeof Game];

  function getLastPostedId(game: Game): string {
    const lastPostedId = PropertiesService.getScriptProperties().getProperty(`LAST_POSTED_ID_${game.toUpperCase()}`);
    if (lastPostedId === null) {
      throw new Error(`Failed getting property of last posted id for ${game}`);
    }
    return lastPostedId;
  }

  function saveLastPostedId(game: Game, id: string): void {
    PropertiesService.getScriptProperties().setProperty(`LAST_POSTED_ID_${game.toUpperCase()}`, id);
  }

  function getFaildPostIds(game: Game): string[] {
    const newAlivalIdsString = PropertiesService.getScriptProperties().getProperty(`FAILD_POST_IDS_${game.toUpperCase()}`);
    if (newAlivalIdsString === null || newAlivalIdsString === '') {
      return [];
    }

    return newAlivalIdsString.split(',');
  }

  function saveFaildPostIds(game: Game, ids: string[]): void {
    const idsString = ids.join(',');
    PropertiesService.getScriptProperties().setProperty(`FAILD_POST_IDS_${game.toUpperCase()}`, idsString);
  }

  HoYoLAB.Genshin.getLastPostedId = () => getLastPostedId(Game.genshin);
  HoYoLAB.Genshin.saveLastPostedId = (id) => { saveLastPostedId(Game.genshin, id) };
  HoYoLAB.Genshin.getFaildPostIds = () => getFaildPostIds(Game.genshin);
  HoYoLAB.Genshin.saveFaildPostIds = (ids) => { saveFaildPostIds(Game.genshin, ids) };
  HoYoLAB.Genshin.getLastPostedEventId = () => {
    const game = Game.genshin;
    const lastPostedId = PropertiesService.getScriptProperties().getProperty(`LAST_POSTED_EVENT_ID_${game.toUpperCase()}`);
    if (lastPostedId === null) {
      throw new Error(`Failed getting property of last posted event id for ${game}`);
    }
    return lastPostedId;
  }
  HoYoLAB.Genshin.saveLastPostedEventId = (id) => {
    const game = Game.genshin;
    PropertiesService.getScriptProperties().setProperty(`LAST_POSTED_EVENT_ID_${game.toUpperCase()}`, id);
  }

  HoYoLAB.ZZZ.getLastPostedId = () => getLastPostedId(Game.zzz);
  HoYoLAB.ZZZ.saveLastPostedId = (id) => { saveLastPostedId(Game.zzz, id) };
  HoYoLAB.ZZZ.getFaildPostIds = () => getFaildPostIds(Game.zzz);
  HoYoLAB.ZZZ.saveFaildPostIds = (ids) => { saveFaildPostIds(Game.zzz, ids) };

  HoYoLAB.StarRail.getLastPostedId = () => getLastPostedId(Game.starRail);
  HoYoLAB.StarRail.saveLastPostedId = (id) => { saveLastPostedId(Game.starRail, id) };
  HoYoLAB.StarRail.getFaildPostIds = () => getFaildPostIds(Game.starRail);
  HoYoLAB.StarRail.saveFaildPostIds = (ids) => { saveFaildPostIds(Game.starRail, ids) };
})();
