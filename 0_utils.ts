const Utils = {
  getUTCNowIsoString(): string {
    return Utilities.formatDate(new Date(), 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  formatLogMessage(messageOrFormat: unknown, args: unknown[]): string {
    if (typeof messageOrFormat === 'string') {
      if (args.length === 0) {
        return messageOrFormat;
      }

      let index = 0;
      const formatted = messageOrFormat.replace(/%s|%d|%f/g, () => {
        const value = args[index];
        index += 1;
        return value === undefined ? '' : String(value);
      });

      const rest = args.slice(index);
      if (rest.length === 0) {
        return formatted;
      }

      return `${formatted} ${rest.map(value => {
        if (typeof value === 'string') return value;
        return JSON.stringify(value);
      }).join(' ')}`;
    }

    return String(messageOrFormat ?? '');
  },

  sendToCloudLogging(message: string, level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' = 'INFO'): void {
    const projectId = PropertiesService.getScriptProperties().getProperty('GCP_PROJECT_ID');
    if (!projectId) {
      console.log(`Cloud Logging skipped because GCP_PROJECT_ID is not set | Message=${message}`);
      return;
    }

    try {
      const payload = {
        logName: `projects/${projectId}/logs/wogglebug-bot`,
        entries: [{
          severity: level,
          textPayload: `[${new Date().toISOString()}] ${message}`,
        }],
      };

      const response = UrlFetchApp.fetch('https://logging.googleapis.com/v2/entries:write', {
        method: 'post',
        contentType: 'application/json',
        headers: {
          Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
        },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
      });

      if (response.getResponseCode() >= 400) {
        console.log(`Failed to send log to Cloud Logging | Status=${response.getResponseCode()} | Body=${response.getContentText()}`);
      }
    } catch (error) {
      console.log(`Failed to send log to Cloud Logging | Error=${String(error)}`);
    }
  },

  info(messageOrFormat: unknown, ...args: unknown[]): void {
    const formattedMessage = Utils.formatLogMessage(messageOrFormat, args);
    console.log(formattedMessage);
    Utils.sendToCloudLogging(formattedMessage, 'INFO');
  },

  log(messageOrFormat: unknown, ...args: unknown[]): void {
    Utils.info(messageOrFormat, ...args);
  },

  warn(messageOrFormat: unknown, ...args: unknown[]): void {
    const formattedMessage = Utils.formatLogMessage(messageOrFormat, args);
    console.warn(formattedMessage);
    Utils.sendToCloudLogging(formattedMessage, 'WARNING');
  },

  error(messageOrFormat: unknown, ...args: unknown[]): void {
    const formattedMessage = Utils.formatLogMessage(messageOrFormat, args);
    console.error(formattedMessage);
    Utils.sendToCloudLogging(formattedMessage, 'ERROR');
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
