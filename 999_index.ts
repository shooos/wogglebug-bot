/**
 * HoYoverse 公式情報を収集して Bsky 連携する
 */
function subscribeHoYoOfficial(): void {
  const currentHours = new Date().getHours();

  if (currentHours >= 23 || currentHours < 8) {
    Logger.log(`Skip subscribing to official info as out of hours | Hours=${currentHours}`);
    return;
  }

  const accessJwt = Bsky.createSession();
  HoYoLABSubscriber.subscribe(accessJwt);
  VideosSubscriber.subscribe(accessJwt);
}

/**
 * Bsky に毎日定期的にお知らせをポストする
 */
function dailyInformationPost(): void {

}

/**
 * 深境螺旋が開始したことを Bsky にポストする
 */
function noticeOpenSpiralAbyss(): void {

}

/**
 * 深境螺旋がリセット間近であることを Bsky にポストする
 */
function noticeCountdownResetSpiralAbyss(): void {
  Genshin.spiralAbyss.countDown(new Date('2024-12-15T00:00:00'));
}

/**
 * スターライト交換が更新されたことを Bsky にポストする
 */
function noticeStarlightShopCharcter(): void {

}

/**
 * 幻想シアター情報を収集する
 */
function subscribeImaginariumTheaterInfo(): void {
  Genshin.imaginariumTheater.subscribe();
}

/**
 * 幻想シアター情報を bsky にポストする
 */
function noticeImaginariumTheaterInfo(): void {
  const accessJwt = Bsky.createSession();
  Genshin.imaginariumTheater.notice(accessJwt, Bluesky.BotType.regular);
}

/**
 * 任意の内容を tester として bsky に投稿する
 */
function postToBsky(): void {
  const accessJwt = Bsky.createSession();

  const content = FetchOfficialPostHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/getPostFull?post_id=35393996&read=1&scene=1`);
  const message = HoYoLAB.Genshin.buildMessages([content])[0];

  Bsky.postMessage(accessJwt, message, Bluesky.BotType.tester);
}

function __test(): void {
  const accessJwt = Bsky.createSession();
  Genshin.imaginariumTheater.notice(accessJwt, Bluesky.BotType.tester);
}