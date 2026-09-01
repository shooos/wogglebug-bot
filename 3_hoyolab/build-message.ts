(() => {
  function createImage(imageUrls: string[]): Bluesky.AttachImage[] {
    return imageUrls.map(url => {
      const rawBlob = Utils.fetchBlob(url);

      if (!rawBlob) return null;

      const validBlob = rawBlob.getBytes().length > Bluesky.MAX_IMAGE_SIZE ?
        Image.compress!(rawBlob, Bluesky.MAX_IMAGE_SIZE) : rawBlob;

      if (!validBlob) {
        Utils.log(`Illegal image | ImageURL=${url}`);
        return null;
      }

      const size = Image.getRectangleSize!(validBlob);

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
      const body = `HoYoLAB 蜴溽･槫・蠑上・繧ｹ繝磯夂衍 #蜴溽･・#蜴溽･槫・蠑乗ュ蝣ｱ

${content.subject}
${content.articleUrl}
謚慕ｨｿ譌･譎・: ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      const hasExceeded = body.length > Bluesky.MAX_BODY_LENGTH;
      return {
        body: `${hasExceeded ? body.slice(0, Bluesky.MAX_BODY_LENGTH) + '窶ｦ' : body}`,
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.ZZZ.buildMessages = (contents) => {
    return contents.map(content => {
      const body = `HoYoLAB 繧ｼ繝ｳ繝ｬ繧ｹ繧ｾ繝ｼ繝ｳ繧ｼ繝ｭ蜈ｬ蠑上・繧ｹ繝磯夂衍 #繧ｼ繝ｳ繧ｼ繝ｭ #ZZZ蜈ｬ蠑乗ュ蝣ｱ

${content.subject}
${content.articleUrl}
謚慕ｨｿ譌･譎・: ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      const hasExceeded = body.length > Bluesky.MAX_BODY_LENGTH;
      return {
        body: `${hasExceeded ? body.slice(0, Bluesky.MAX_BODY_LENGTH) + '窶ｦ' : body}`,
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.StarRail.buildMessages = (contents) => {
    return contents.map(content => {
      const body = `HoYoLAB 蟠ｩ螢翫せ繧ｿ繝ｼ繝ｬ繧､繝ｫ蜈ｬ蠑上・繧ｹ繝磯夂衍 #蟠ｩ螢翫せ繧ｿ繝ｼ繝ｬ繧､繝ｫ #繧ｹ繧ｿ繝ｬ蜈ｬ蠑乗ュ蝣ｱ

${content.subject}
${content.articleUrl}
謚慕ｨｿ譌･譎・: ${Utils.formatToViewDate(content.createdAt)}

${content.body}`;

      const hasExceeded = body.length > Bluesky.MAX_BODY_LENGTH;
      return {
        body: `${hasExceeded ? body.slice(0, Bluesky.MAX_BODY_LENGTH) + '窶ｦ' : body}`,
        images: createImage(content.imageUrls),
      }
    });
  }

  HoYoLAB.Genshin.buildEventMessages = (events) => {
    return events.map(event => {
      const body = `HoYoLAB 蜴溽･槫・蠑上う繝吶Φ繝磯夂衍 #蜴溽･・#蜴溽･槫・蠑乗ュ蝣ｱ

${event.subject}
${event.articleUrl}
譛滄俣: ${Utils.formatToViewDate(event.startAt)} ・・${Utils.formatToViewDate(event.endAt)}
謚慕ｨｿ譌･譎・: ${Utils.formatToViewDate(event.createdAt)}`;

      const hasExceeded = body.length > Bluesky.MAX_BODY_LENGTH;
      return {
        body: `${hasExceeded ? body.slice(0, Bluesky.MAX_BODY_LENGTH) + '窶ｦ' : body}`,
        images: createImage(event.imageUrls),
      }
    });
  }

  function makeSummaryMessage(posts: HoYo.Content[], topMessage: string): Bluesky.Message {
    const escape = (str: string): string => {
      return str.replaceAll(/[\r\n]/g, '').replaceAll(/[\|\+\[\]\(\)\*\.\^\\\{\}\?]/g, ' ');
    }

    const messages = posts.map(post => {
      const subject = escape(post.subject);
      return `謄 ${subject}`;
    }).join('\n\n');
    const body = `湯 ${topMessage} 湯

${messages.length === 0 ? '舶 譛ｬ譌･縺ｮ蜈ｬ蠑上・繧ｹ繝医・縺ゅｊ縺ｾ縺帙ｓ縺ｧ縺励◆' : messages}`;

    const unicodeBody = new Bluesky.UnicodeString(body);
    const facetTargets = posts.map(post => {
      const subject = escape(post.subject);
      const regexp = new RegExp(`(${subject})`, 'gim');
      return { regex: regexp, uri: post.articleUrl };
    });

    return {
      body,
      customFacets: Bsky.detectCustomFacets!(unicodeBody, facetTargets),
      images: createImage(
        posts.map(post => post.imageUrls[0]).filter(it => it != undefined).slice(0, 4)
      ),
    };
  }

  HoYoLAB.Genshin.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '譛ｬ譌･縺ｮ蜴溽･槫・蠑上・繧ｹ繝医∪縺ｨ繧・);
  }

  HoYoLAB.ZZZ.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '譛ｬ譌･縺ｮ繧ｼ繝ｳ繝ｬ繧ｹ繧ｾ繝ｼ繝ｳ繧ｼ繝ｭ蜈ｬ蠑上・繧ｹ繝医∪縺ｨ繧・);
  }

  HoYoLAB.StarRail.buildSummaryMessage = (posts) => {
    return makeSummaryMessage(posts, '譛ｬ譌･縺ｮ蟠ｩ螢翫せ繧ｿ繝ｼ繝ｬ繧､繝ｫ蜈ｬ蠑上・繧ｹ繝医∪縺ｨ繧・);
  }
})();


