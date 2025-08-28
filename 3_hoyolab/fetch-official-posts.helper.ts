const FetchOfficialPostsHelper = (() => {
  const headers = {
    'Accept-Language': 'ja-JP,ja;q=0.9',
    'X-Rpc-Language': 'ja-jp',
    'X-Rpc-Hour': Utils.extractHourString(new Date()),
  };

  return {
    execute(url: string): HoYo.Content[] {
      Logger.log(`Start fetching HoYoLAB posts | URL=${url}`);

      const response = UrlFetchApp.fetch(url, {
        method: 'get',
        contentType: 'application/json',
        headers,
        muteHttpExceptions: true
      });

      if (response.getResponseCode() !== 200) {
        Logger.log(`Failed fetching HoYoLAB posts | StatusCode=${response.getResponseCode()}`);
        return [];
      }

      const contentText = response.getContentText();
      const json = JSON.parse(contentText);
      const contents: HoYo.Content[] = json.data.list.map((c: any) => {
        const content: HoYo.Content = {
          id: c.post.post_id,
          subject: c.post.subject,
          createdAt: new Date(c.post.created_at * 1000),
          articleUrl: `https://www.hoyolab.com/article/${c.post.post_id}`,
          imageUrls: c.cover_list.slice(0, 4).map((image: any) => image.url),
          body: c.post.content,
        };

        return content;
      });

      Logger.log(`Succeeded in fetching HoYoLAB posts | Posts=${JSON.stringify(contents.map(c => ({
        id: c.id,
        subject: c.subject,
        createdAt: Utils.formatToViewDate(c.createdAt),
        images: `${c.imageUrls.length} images`,
      })), null, 2)}`);

      return contents;
    }
  }
})();
