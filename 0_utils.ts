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

  log(messageOrFormat: unknown, ...args: unknown[]): void {
    const formattedMessage = Utils.formatLogMessage(messageOrFormat, args);
    console.log(formattedMessage);
    Utils.sendToCloudLogging(formattedMessage, 'INFO');
  },

  fetchWebsiteTitle(url: string): string {
    const response = UrlFetchApp.fetch(url, { method: 'get', contentType: 'text/html', muteHttpExceptions: true });

    if (response.getResponseCode() !== 200) return '';

    const matches = response.getContentText().match(/<title>(.*?)<\/title>/);
    return matches ? matches[1] : '';
  },

  /**
   * 貂｡縺輔ｌ縺滓律譎よュ蝣ｱ縺九ｉ Asia/Tokyo 繧ｿ繧､繝繧ｾ繝ｼ繝ｳ縺ｮ譎・HH)驛ｨ蛻・・縺ｿ謚懊″蜃ｺ縺励※霑斐☆縲・
   * 24譎る俣陦ｨ險・
   * 
   * @param datetime Date 譌･譎・
   * @returns 迴ｾ蝨ｨ譎・HH)
   */
  extractHourString(datetime: Date): string {
    return Utilities.formatDate(datetime, 'Asia/Tokyo', 'HH');
  },

  /**
   * yyyy-MM-dd HH:mm 縺ｫ繝輔か繝ｼ繝槭ャ繝医＠縺ｦ霑斐☆
   * 繧ｿ繧､繝繧ｾ繝ｼ繝ｳ縺ｯ Asia/Tokyo
   * 
   * @param date Date 譌･譎・
   * @returns 繝輔か繝ｼ繝槭ャ繝域ｸ医∩譌･譎よ枚蟄怜・
   */
  formatToViewDate(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  },

  /**
   * yyyy-MM-dd HH:mm:ss:SSS 縺ｫ繝輔か繝ｼ繝槭ャ繝医＠縺ｦ霑斐☆
   * 繧ｿ繧､繝繧ｾ繝ｼ繝ｳ縺ｯ Asia/Tokyo
   * @param date Date 譌･譎・
   * @returns 繝輔か繝ｼ繝槭ャ繝域ｸ医∩譌･譎よ枚蟄怜・
   */
  formatToViewDateTimeMillis(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss:SSS');
  },

  /**
   * yyyy蟷ｴM譛・譌･ 縺ｫ繝輔か繝ｼ繝槭ャ繝医＠縺ｦ霑斐☆
   * 繧ｿ繧､繝繧ｾ繝ｼ繝ｳ縺ｯ Asia/Tokyo
   * 
   * @param date Date 譌･譎・
   * @returns 繝輔か繝ｼ繝槭ャ繝域ｸ医∩譌･譎よ枚蟄怜・
   */
  formatToViewDateJPN(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy蟷ｴM譛・譌･');
  },

  /**
   * HH:mm 縺ｫ繝輔か繝ｼ繝槭ャ繝医＠縺ｦ霑斐☆
   * @param date Date 譌･譎・
   * @returns 繝輔か繝ｼ繝槭ャ繝域ｸ医∩譎ょ綾譁・ｭ怜・
   */
  formatToViewTime(date: Date): String {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'HH:mm');
  },

  /**
   * ISO-8601譁・ｭ怜・陦ｨ迴ｾ縺ｫ繝輔か繝ｼ繝槭ャ繝医＠縺ｦ霑斐☆
   * 
   * @param date Date 譌･譎・
   * @returns 繝輔か繝ｼ繝槭ャ繝域ｸ医∩譌･譎よ枚蟄怜・
   */
  formatDateToIsoString(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  /**
   * Blob繧貞叙蠕励＠縺ｦ霑斐☆
   * 
   * @param location 蜿門ｾ怜ｯｾ雎｡縺ｮURL
   * @returns Blob
   */
  fetchBlob(location: string): GoogleAppsScript.Base.Blob | null {
    const response = UrlFetchApp.fetch(location, { method: 'get', muteHttpExceptions: true });

    if (response.getResponseCode() !== 200) {
      Utils.log(`Failed fetching blob | Location=${location}`);
      return null;
    }

    return response.getBlob();
  },
}


