const FetchOfficialPostHelper = (() => {
  const headers = {
    'Accept-Language': 'ja-JP,ja;q=0.9',
    'X-Rpc-Language': 'ja-jp',
    'X-Rpc-Hour': Utils.extractHourString(new Date()),
  };

  function extractTextContent(rawText: string): string {
    const dom = HtmlParser.parse(rawText);
    const extracted = dom.querySelectorAll('*').map((it: any) => it.textContent).join('');
    return extracted;
  }

  return {
    execute(url: string): HoYo.Content | null {
      Logger.log(`Start fetching HoYoLAB posts | URL=${url}`);

      const response = UrlFetchApp.fetch(url, {
        method: 'get',
        contentType: 'application/json',
        headers,
        muteHttpExceptions: true
      });

      if (response.getResponseCode() !== 200) {
        Logger.log(`Failed fetching HoYoLAB post | StatusCode=${response.getResponseCode()}`);
        return null;
      }

      const contentText = response.getContentText();
      const json = JSON.parse(contentText);
      const post = json.data.post;

      const body = extractTextContent(post.post.content);

      const content: HoYo.Content = {
        id: post.post.post_id,
        subject: post.post.subject,
        createdAt: new Date(post.post.created_at * 1000),
        articleUrl: `https://www.hoyolab.com/article/${post.post.post_id}`,
        imageUrls: post.cover_list.slice(0, 4).map((image: any) => image.url),
        body,
      };

      Logger.log(`Succeeded in fetching HoYoLAB post | Posts=${JSON.stringify({
        id: content.id,
        subject: content.subject,
        createdAt: Utils.formatToViewDate(content.createdAt),
        images: `${content.imageUrls.length} images`,
      }, null, 2)}`);

      return content;
    }
  }
})();
