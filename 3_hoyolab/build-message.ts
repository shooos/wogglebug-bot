(() => {
  function createImage(imageUrls: string[]): Bluesky.AttachImage[] {
    return imageUrls.map(url => {
      const rawBlob = Utils.fetchBlob(url);

      const validBlob = rawBlob.getBytes().length > Bluesky.MAX_IMAGE_SIZE ?
        Image.compress(rawBlob, Bluesky.MAX_IMAGE_SIZE) : rawBlob;

      if (!validBlob) {
        Logger.log(`Illegal image | ImageURL=${url}`);
        return null;
      }

      const size = Image.getRectangleSize(validBlob);

      return {
        altText: '',
        blob: validBlob,
        aspectRatio: {
          width: size.width,
          height: size.height,
        }
      };
    }).filter(it => it !== null);
  }

  HoYoLAB.Genshin.buildMessages = (contents) => {
    return contents.map(content => {
      const body = `HoYoLAB 原神公式ポスト通知 #原神 #原神公式情報

${content.subject}
${content.articleUrl}
投稿日時 : ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      return {
        body: body.slice(0, Bluesky.MAX_BODY_LENGTH) + '…',
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.ZZZ.buildMessages = (contents) => {
    return contents.map(content => {
      const body = `HoYoLAB ゼンレスゾーンゼロ公式ポスト通知 #ゼンゼロ #ZZZ公式情報

${content.subject}
${content.articleUrl}
投稿日時 : ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      return {
        body: body.slice(0, Bluesky.MAX_BODY_LENGTH) + '…',
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.StarRail.buildMessages = (contents) => {
    return contents.map(content => {
      const body = `HoYoLAB 崩壊スターレイル公式ポスト通知 #崩壊スターレイル #スタレ公式情報

${content.subject}
${content.articleUrl}
投稿日時 : ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      return {
        body: body.slice(0, Bluesky.MAX_BODY_LENGTH) + '…',
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.Genshin.buildEventMessages = (events) => {
    return events.map(event => {
      const body = `HoYoLAB 原神公式イベント通知 #原神 #原神公式情報

${event.subject}
${event.articleUrl}
期間: ${Utils.formatToViewDate(event.startAt)} ～ ${Utils.formatToViewDate(event.endAt)}
投稿日時 : ${Utils.formatToViewDate(event.createdAt)}`;

      return {
        body,
        images: createImage(event.imageUrls),
      }
    });
  }
})();
