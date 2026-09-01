/**
 * HoYoVerse 蜈ｬ蠑乗ュ蝣ｱ繧貞庶髮・＠縺ｦ Bluesky 騾｣謳ｺ縺吶ｋ
 */
function subscribeHoYoOfficial(): void {
  const currentHours = new Date().getHours();

  if (currentHours >= 23 || currentHours < 8) {
    Utils.log(`Skip subscribing to official info as out of hours | Hours=${currentHours}`);
    return;
  }

  HoYoLABSubscriber.subscribe!();
  VideosSubscriber.subscribe!();
  Discord.kickGithubAction!();
}

/**
 * 1譌･縺ｮ邨ゅｏ繧翫↓ HoYoLAB 蜈ｬ蠑乗ュ蝣ｱ繧偵∪縺ｨ繧√※ Bsky 騾夂衍縺吶ｋ
 */
function notifyTodaysHoYoLABOfficialPosts(): void {
  const currentDate = new Date();

  HoYoLABSubscriber.notifyTodays!(currentDate);
}

/**
 * Bsky 縺ｫ螳壽悄逧・↓縺顔衍繧峨○繧偵・繧ｹ繝医☆繧・
 */
function periodicallyInformationPost(): void {
  Utils.log(`Start periodical information post`);

  const currentDate = new Date();
  const messages = [
    Genshin.starglitterExchange!.subscribe!(currentDate),
    DailyInfo.loginBonus!(currentDate),
    DailyInfo.weeklyMessage!(currentDate),
    ...DailyInfo.domainMessages!(currentDate),
  ].filter(it => it !== null);

  if (!messages.length) {
    Utils.log(`No information`);
  }

  const accessJwt = Bsky.createSession!();
  messages.forEach(message => {
    Bsky.postMessage!(accessJwt, message, Bluesky.BotType.regular);
  });

  Utils.log(`Completed periodical information post`);
}

/**
 * 豺ｱ蠅・楴譌九′髢句ｧ九＠縺溘％縺ｨ繧・Bsky 縺ｫ繝昴せ繝医☆繧・
 */
function noticeOpenSpiralAbyss(): void {
  Genshin.spiralAbyss!.open!(new Date());
}

/**
 * 豺ｱ蠅・楴譌九′繝ｪ繧ｻ繝・ヨ髢楢ｿ代〒縺ゅｋ縺薙→繧・Bsky 縺ｫ繝昴せ繝医☆繧・
 */
function noticeCountdownResetSpiralAbyss(): void {
  Genshin.spiralAbyss!.countDown!(new Date());
}

/**
 * 繧ｹ繧ｿ繝ｼ繝ｩ繧､繝井ｺ､謠帙′譖ｴ譁ｰ縺輔ｌ縺溘％縺ｨ繧・Bsky 縺ｫ繝昴せ繝医☆繧・
 */
function noticeStarlightShopCharacter(): void {

}

/**
 * 蜴溽･槭Μ繝ｪ繝ｼ繧ｹ諠・ｱ繧貞庶髮・☆繧・
 */
function subscribeGenshinReleaseInfo(): void {
  Genshin.subscribe!();
}

/**
 * 蟷ｻ諠ｳ繧ｷ繧｢繧ｿ繝ｼ諠・ｱ繧・bsky 縺ｫ繝昴せ繝医☆繧・
 */
function noticeImaginariumTheaterInfo(): void {
  const accessJwt = Bsky.createSession!();
  Genshin.imaginariumTheater!.notice!(accessJwt, Bluesky.BotType.regular);
}

/**
 * 蟷ｻ諠ｳ繧ｷ繧｢繧ｿ繝ｼ縺ｮ髢句ｹ輔ｒ騾夂衍縺吶ｋ
 */
function startImaginariumTheater(): void {
  const accessJwt = Bsky.createSession!();
  Genshin.imaginariumTheater!.start!(accessJwt, new Date, Bluesky.BotType.regular);
}

/**
 * 莉ｻ諢上・蜀・ｮｹ繧・tester 縺ｨ縺励※ bsky 縺ｫ謚慕ｨｿ縺吶ｋ
 */
function postToBsky(): void {
  const accessJwt = Bsky.createSession!();
  const messages = DailyInfo.domainMessages!(new Date('2025-02-10T08:00:00'));

  messages.forEach(message => {
    Bsky.postMessage!(accessJwt, message, Bluesky.BotType.tester);
  });
}

function __test(): void {
  const msg = DailyInfo.weeklyMessage!(new Date('2026-06-29T07:50:00+09:00'));
  Utils.log(`Weekly message | Body=${msg?.body}`);
}


