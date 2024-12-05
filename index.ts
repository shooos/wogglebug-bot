/**
 * HoYoverse 公式情報を収集して Bsky 連携する
 */
function subscribeHoYoOfficial(): void {
  const currentHours = new Date().getHours();

  if (currentHours >= 23 || currentHours < 8) {
    Logger.log(`Skip subscribing to official info as out of hours | Hours=${currentHours}`);
    return;
  }

  HoYoLABSubscriber.subscribe();
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

}

/**
 * スターライト交換が更新されたことを Bsky にポストする
 */
function noticeStarlightShopCharcter(): void {

}
