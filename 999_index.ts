/**
 * HoYoVerse 公式情報を収集して Bsky 連携する
 */
function subscribeHoYoOfficial(): void {
  const currentHours = new Date().getHours();

  if (currentHours >= 23 || currentHours < 8) {
    Logger.log(`Skip subscribing to official info as out of hours | Hours=${currentHours}`);
    return;
  }

  HoYoLABSubscriber.subscribe!();
  VideosSubscriber.subscribe!();
  Discord.kickGithubAction!();
}

/**
 * 1日の終わりに HoYoLAB 公式情報をまとめて Bsky 通知する
 */
function notifyTodaysHoYoLABOfficialPosts(): void {
  const currentDate = new Date();

  HoYoLABSubscriber.notifyTodays!(currentDate);
}

/**
 * Bsky に定期的にお知らせをポストする
 */
function periodicallyInformationPost(): void {
  Logger.log(`Start periodical information post`);

  const currentDate = new Date();
  const messages = [
    Genshin.starglitterExchange!.subscribe!(currentDate),
    DailyInfo.loginBonus!(currentDate),
    DailyInfo.weeklyMessage!(currentDate),
    ...DailyInfo.domainMessages!(currentDate),
  ].filter(it => it !== null);

  if (!messages.length) {
    Logger.log(`No information`);
  }

  const accessJwt = Bsky.createSession!();
  messages.forEach(message => {
    Bsky.postMessage!(accessJwt, message, Bluesky.BotType.regular);
  });

  Logger.log(`Completed periodical information post`);
}

/**
 * 深境螺旋が開始したことを Bsky にポストする
 */
function noticeOpenSpiralAbyss(): void {
  Genshin.spiralAbyss!.open!(new Date());
}

/**
 * 深境螺旋がリセット間近であることを Bsky にポストする
 */
function noticeCountdownResetSpiralAbyss(): void {
  Genshin.spiralAbyss!.countDown!(new Date());
}

/**
 * スターライト交換が更新されたことを Bsky にポストする
 */
function noticeStarlightShopCharacter(): void {

}

/**
 * 原神リリース情報を収集する
 */
function subscribeGenshinReleaseInfo(): void {
  Genshin.subscribe!();
}

/**
 * 幻想シアター情報を bsky にポストする
 */
function noticeImaginariumTheaterInfo(): void {
  const accessJwt = Bsky.createSession!();
  Genshin.imaginariumTheater!.notice!(accessJwt, Bluesky.BotType.regular);
}

/**
 * 幻想シアターの開幕を通知する
 */
function startImaginariumTheater(): void {
  const accessJwt = Bsky.createSession!();
  Genshin.imaginariumTheater!.start!(accessJwt, new Date, Bluesky.BotType.regular);
}

/**
 * 任意の内容を tester として bsky に投稿する
 */
function postToBsky(): void {
  const accessJwt = Bsky.createSession!();
  const messages = DailyInfo.domainMessages!(new Date('2025-02-10T08:00:00'));

  messages.forEach(message => {
    Bsky.postMessage!(accessJwt, message, Bluesky.BotType.tester);
  });
}

function __test(): void {
  FetchOfficialPostHelper.execute(`https://bbs-api-os.hoyolab.com/community/post/wapi/getPostFull?post_id=40271715&read=1&scene=1`);
}
