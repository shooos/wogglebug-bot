const Utils = {
  getUTCNowIsoString(): string {
    return Utilities.formatDate(new Date(), 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  },

  fetchWebsiteTitle(url): string {
    const response = UrlFetchApp.fetch(url, { method: 'get', contentType: 'text/html' });

    if (response.getResponseCode() !== 200) return '';

    const matches = response.getContentText().match(/<title>(.*?)<\/title>/);
    return matches[1];
  }
}
