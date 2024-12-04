(() => {
  Videos.getLastCheckedPublishedAt = () => {
    const value = PropertiesService
      .getScriptProperties()
      .getProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`);

    return new Date(value);
  }

  Videos.saveLastCheckedPublishedAt = (value: Date) => {
    PropertiesService
      .getScriptProperties()
      .setProperty(`LAST_CHECKED_VIDEOS_PUBLISHED_AT_${HoYo.Game.genshin.toUpperCase()}`, Utils.formatDateToIsoString(value));
  }

  Videos.fetchGenshinOfficialVideos = (lastCheckedPublishedAt) => {
    const ret = UrlFetchApp.fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCAVR6Q0YgYa8xwz8rdg9Mrg');
    const doc = XmlService.parse(ret.getContentText());
    const root = doc.getRootElement();
    const atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
    const media = XmlService.getNamespace('media', 'http://search.yahoo.com/mrss/');
    const yt = XmlService.getNamespace('yt', 'http://www.youtube.com/xml/schemas/2015');

    const entries = root.getChildren('entry', atom);

    return entries.map(it => {
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
  }



  Videos.buildMessages = (videoInfos) => videoInfos.map(video => {
    const message: Bluesky.Message = {
      body: `YouTube 原神公式アカウントが動画を公開しました #原神 #原神公式情報

${video.title}
公開日時 : ${Utils.formatToViewDate(video.published)}`,
      images: [],
      linkUrl: video.url,
    };

    if (video.thumbnailUrl) {
      const rawBlob = Utils.fetchBlob(video.thumbnailUrl);
      const validBlob = rawBlob.getBytes().length > Bluesky.MAX_IMAGE_SIZE ? Image.compress(rawBlob) : rawBlob;
      const size = Image.getRectangleSize(validBlob);

      message.images.push({
        altText: `Video Thumbnail - ${video.title}`,
        blob: validBlob,
        aspectRatio: {
          width: size.width,
          height: size.height,
        },
      })
    }

    return message;
  })
})();
