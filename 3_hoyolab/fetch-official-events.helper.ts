const FetchOfficialEventsHelper = (() => {
  const headers = {
    'Accept-Language': 'ja-JP,ja;q=0.9',
    'X-Rpc-Language': 'ja-jp',
    'X-Rpc-Hour': Utils.extractHourString(new Date()),
  };

  function resolveEventStatus(statusInt: number, statusIng: number): HoYo.EventStatus {
    if (statusInt === 3 && statusIng === 0) return HoYo.EventStatus.INPROGRESS;
    if (statusInt === 3 && statusIng === 1) return HoYo.EventStatus.ACCEPTING;
    return HoYo.EventStatus.CLOSED;
  }

  return {
    execute(url: string): HoYo.Event[] {
      Logger.log(`Start fetching HoYoLAB events | URL=${url}`);

      const response = UrlFetchApp.fetch(url, {
        method: 'get',
        contentType: 'application/json',
        headers,
        muteHttpExceptions: true,
      });

      if (response.getResponseCode() !== 200) {
        Logger.log(`Failed fetching HoYoLAB events | StatusCode=${response.getResponseCode()}`);
        return [];
      }

      const contentText = response.getContentText();
      const json = JSON.parse(contentText);
      const events: HoYo.Event[] = json.data.list.map(e => {
        const event: HoYo.Event = {
          id: e.id,
          subject: e.name,
          startAt: new Date(e.start * 1000),
          endAt: new Date(e.end * 1000),
          status: resolveEventStatus(e.status_int, e.status_ing),
          articleUrl: `https://www.hoyolab.com/article/${e.id}`,
          imageUrls: e.banner_url ? [e.banner_url] : [],
          createdAt: new Date(e.create_at * 1000),
        };

        return event;
      });

      Logger.log(`Succeeded in fetching HoYoLAB events | Events=${JSON.stringify(events.map(c => ({
        id: c.id,
        subject: c.subject,
        createdAt: Utils.formatToViewDate(c.createdAt),
        images: `${c.imageUrls.length} images`,
      })), null, 2)}`);

      return events;
    }
  }
})();
