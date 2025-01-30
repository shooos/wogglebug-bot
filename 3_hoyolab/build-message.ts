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

  function makeSummaryMessage(posts: HoYo.Content[], topMessage: string): Bluesky.Message {
    const messages = posts.map(post => {
      const subject = post.subject.replaceAll(/[\r\n\|]/, '');
      return `📣 ${subject}`;
    }).join('\n\n');
    const body = `📒 ${topMessage} 📒

${messages.length === 0 ? '🔕 本日の公式ポストはありませんでした' : messages}`;

    const unicodeBody = new Bluesky.UnicodeString(body);

    return {
      body,
      customFacets: posts.map(post => {
        const subject = post.subject.replaceAll(/[\r\n\|]/, '');
        const regexp = new RegExp(`(${subject})`, 'gim');
        return Bsky.detectCustomFacet(unicodeBody, regexp, post.articleUrl);
      }),
      images: createImage(
        posts.map(post => post.imageUrls[0]).filter(it => it != undefined).slice(0, 4)
      ),
    };
  }

  HoYoLAB.Genshin.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '本日の原神公式ポストまとめ');
  }

  HoYoLAB.ZZZ.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '本日のゼンレスゾーンゼロ公式ポストまとめ');
  }

  HoYoLAB.StarRail.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '本日の崩壊スターレイル公式ポストまとめ');
  }
})();
