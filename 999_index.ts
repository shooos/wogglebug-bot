/**
 * HoYoVerse 公式情報を収集して Bluesky 連携する
 */
function subscribeHoYoOfficial(): void {
  Utils.beginExecution();
  Utils.info(`Start subscribe HoYo official information`);
  try {
    const currentHours = new Date().getHours();

    if (currentHours >= 23 || currentHours < 8) {
      Utils.info(`Skip subscribing to official info as out of hours | Hours=${currentHours}`);
      return;
    }

    HoYoLABSubscriber.subscribe!();
    VideosSubscriber.subscribe!();
    Discord.kickGithubAction!();
    Utils.info(`Completed subscribe HoYo official information`);
  } catch (error) {
    Utils.error(`Failed subscribe HoYo official information | Error=${error}`);
    throw error;
  }
}

/**
 * 1日の終わりに HoYoLAB 公式情報をまとめて Bsky 通知する
 */
function notifyTodaysHoYoLABOfficialPosts(): void {
  Utils.beginExecution();
  Utils.info(`Start notify todays HoYoLAB official posts`);
  try {
    const currentDate = new Date();

    HoYoLABSubscriber.notifyTodays!(currentDate);
    Utils.info(`Completed notify todays HoYoLAB official posts`);
  } catch (error) {
    Utils.error(`Failed notify todays HoYoLAB official posts | Error=${error}`);
    throw error;
  }
}

/**
 * Bsky に定期的にお知らせをポストする
 */
function periodicallyInformationPost(): void {
  Utils.beginExecution();
  Utils.info(`Start periodical information post`);

  try {
    const currentDate = new Date();
    const messages = [
      Genshin.starglitterExchange!.subscribe!(currentDate),
      DailyInfo.loginBonus!(currentDate),
      DailyInfo.weeklyMessage!(currentDate),
      ...DailyInfo.domainMessages!(currentDate),
    ].filter(it => it !== null);

    if (!messages.length) {
      Utils.info(`No information`);
    }

    const accessJwt = Bsky.createSession!();
    messages.forEach(message => {
      Bsky.postMessage!(accessJwt, message, Bluesky.BotType.regular);
    });

    Utils.info(`Completed periodical information post`);
  } catch (error) {
    Utils.error(`Failed periodical information post | Error=${error}`);
    throw error;
  }
}

/**
 * 深境螺旋が開始したことを Bsky にポストする
 */
function noticeOpenSpiralAbyss(): void {
  Utils.beginExecution();
  Utils.info(`Start notice open Spiral Abyss`);
  try {
    Genshin.spiralAbyss!.open!(new Date());
    Utils.info(`Completed notice open Spiral Abyss`);
  } catch (error) {
    Utils.error(`Failed notice open Spiral Abyss | Error=${error}`);
    throw error;
  }
}

/**
 * 深境螺旋がリセット間近であることを Bsky にポストする
 */
function noticeCountdownResetSpiralAbyss(): void {
  Utils.beginExecution();
  Utils.info(`Start notice Spiral Abyss countdown`);
  try {
    Genshin.spiralAbyss!.countDown!(new Date());
    Utils.info(`Completed notice Spiral Abyss countdown`);
  } catch (error) {
    Utils.error(`Failed notice Spiral Abyss countdown | Error=${error}`);
    throw error;
  }
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
  Utils.beginExecution();
  Utils.info(`Start subscribe Genshin release information`);
  try {
    Genshin.subscribe!();
    Utils.info(`Completed subscribe Genshin release information`);
  } catch (error) {
    Utils.error(`Failed subscribe Genshin release information | Error=${error}`);
    throw error;
  }
}

/**
 * 幻想シアター情報を bsky にポストする
 */
function noticeImaginariumTheaterInfo(): void {
  Utils.beginExecution();
  Utils.info(`Start notice Imaginarium Theater information`);
  try {
    const accessJwt = Bsky.createSession!();
    Genshin.imaginariumTheater!.notice!(accessJwt, Bluesky.BotType.regular);
    Utils.info(`Completed notice Imaginarium Theater information`);
  } catch (error) {
    Utils.error(`Failed notice Imaginarium Theater information | Error=${error}`);
    throw error;
  }
}

/**
 * 幻想シアターの開幕を通知する
 */
function startImaginariumTheater(): void {
  Utils.beginExecution();
  Utils.info(`Start Imaginarium Theater`);
  try {
    const accessJwt = Bsky.createSession!();
    Genshin.imaginariumTheater!.start!(accessJwt, new Date, Bluesky.BotType.regular);
    Utils.info(`Completed Imaginarium Theater`);
  } catch (error) {
    Utils.error(`Failed Imaginarium Theater | Error=${error}`);
    throw error;
  }
}

/**
 * 任意の内容を tester として bsky に投稿する
 */
function postToBsky(): void {
  Utils.beginExecution();
  Utils.info(`Start test post to Bsky`);
  try {
    const accessJwt = Bsky.createSession!();
    const messages = DailyInfo.domainMessages!(new Date('2025-02-10T08:00:00'));

    messages.forEach(message => {
      Bsky.postMessage!(accessJwt, message, Bluesky.BotType.tester);
    });
    Utils.info(`Completed test post to Bsky`);
  } catch (error) {
    Utils.error(`Failed test post to Bsky | Error=${error}`);
    throw error;
  }
}

function __test(): void {
  const msg = DailyInfo.weeklyMessage!(new Date('2026-06-29T07:50:00+09:00'));
  Utils.log(`Weekly message | Body=${msg?.body}`);
}
