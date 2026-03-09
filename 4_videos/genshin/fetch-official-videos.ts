(() => {
  const parseXml = (xml: string): GoogleAppsScript.XML_Service.Document | null => {
    try {
      return XmlService.parse(xml);
    } catch {
      Logger.log(`Failed to parse XML`);
      return null;
    }
  }

  Videos.fetchGenshinOfficialVideos = (lastCheckedPublishedAt) => {
    Logger.log(`Start fetching genshin official videos | LastCheckedPublishedAt=${Utils.formatDateToIsoString(lastCheckedPublishedAt)}`);

    const ret = UrlFetchApp.fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCAVR6Q0YgYa8xwz8rdg9Mrg', { muteHttpExceptions: true });
    const doc = parseXml(ret.getContentText());

    if (doc == null) return [];

    const root = doc.getRootElement();
    const atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
    const media = XmlService.getNamespace('media', 'http://search.yahoo.com/mrss/');
    const yt = XmlService.getNamespace('yt', 'http://www.youtube.com/xml/schemas/2015');

    const entries = root.getChildren('entry', atom);

    const videos = entries.map(it => {
      const id = it.getChild('videoId', yt).getText();
      const title = it.getChild('title', atom).getText();
      const url = it.getChild('link', atom).getAttribute('href').getValue();
      const thumbnailUrl = it.getChild('group', media).getChild('thumbnail', media).getAttribute('url').getValue();
      const published = new Date(it.getChild('published', atom).getText());

      return {
        id,
        url,
        title,
        published,
        thumbnailUrl,
      };
    }).filter(it => new Date(it.published) > lastCheckedPublishedAt);

    Logger.log(`Success fetching genshin official videos | Videos=${JSON.stringify(
      videos.map(v => ({
        id: v.id,
        title: v.title,
        published: Utils.formatDateToIsoString(v.published)
      }))
    )}`)

    return videos;
  }
})();
