const Utils = {
  getUTCNowIsoString(): string {
    return Utilities.formatDate(new Date(), 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  fetchWebsiteTitle(url: string): string {
    const response = UrlFetchApp.fetch(url, { method: 'get', contentType: 'text/html' });

    if (response.getResponseCode() !== 200) return '';

    const matches = response.getContentText().match(/<title>(.*?)<\/title>/);
    return matches[1];
  },

  /**
   * 渡された日時情報から Asia/Tokyo タイムゾーンの時(HH)部分のみ抜き出して返す。
   * 24時間表記
   * 
   * @param datetime Date 日時
   * @returns 現在時(HH)
   */
  extractHourString(datetime: Date): string {
    return Utilities.formatDate(datetime, 'Asia/Tokyo', 'HH');
  },

  /**
   * yyyy-MM-dd HH:mm にフォーマットして返す
   * タイムゾーンは Asia/Tokyo
   * 
   * @param date Date 日時
   * @returns フォーマット済み日時文字列
   */
  formatToViewDate(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  },
}
