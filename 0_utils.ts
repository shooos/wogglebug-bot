const Utils = {
  getUTCNowIsoString(): string {
    return Utilities.formatDate(new Date(), 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  fetchWebsiteTitle(url: string): string {
    const response = UrlFetchApp.fetch(url, { method: 'get', contentType: 'text/html', muteHttpExceptions: true });

    if (response.getResponseCode() !== 200) return '';

    const matches = response.getContentText().match(/<title>(.*?)<\/title>/);
    return matches ? matches[1] : '';
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

  /**
   * yyyy-MM-dd HH:mm:ss:SSS にフォーマットして返す
   * タイムゾーンは Asia/Tokyo
   * @param date Date 日時
   * @returns フォーマット済み日時文字列
   */
  formatToViewDateTimeMillis(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss:SSS');
  },

  /**
   * yyyy年M月d日 にフォーマットして返す
   * タイムゾーンは Asia/Tokyo
   * 
   * @param date Date 日時
   * @returns フォーマット済み日時文字列
   */
  formatToViewDateJPN(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日');
  },

  /**
   * HH:mm にフォーマットして返す
   * @param date Date 日時
   * @returns フォーマット済み時刻文字列
   */
  formatToViewTime(date: Date): String {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'HH:mm');
  },

  /**
   * ISO-8601文字列表現にフォーマットして返す
   * 
   * @param date Date 日時
   * @returns フォーマット済み日時文字列
   */
  formatDateToIsoString(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  /**
   * Blobを取得して返す
   * 
   * @param location 取得対象のURL
   * @returns Blob
   */
  fetchBlob(location: string): GoogleAppsScript.Base.Blob | null {
    const response = UrlFetchApp.fetch(location, { method: 'get', muteHttpExceptions: true });

    if (response.getResponseCode() !== 200) {
      Logger.log(`Failed fetching blob | Location=${location}`);
      return null;
    }

    return response.getBlob();
  },
}
