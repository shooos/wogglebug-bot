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

  Nte.buildMessage = (message: DISCORD.Message): Bluesky.Message => {
    const embed = message.embeds?.[0];

    if (!embed) {
      throw new Error(`Message has no embeds | Message ID=${message.id}`);
    }

    if (!embed.description) {
      throw new Error(`Embed has no description | Message ID=${message.id}`);
    }

    if (!embed.timestamp) {
      throw new Error(`Embed has no timestamp | Message ID=${message.id}`);
    }

    const body = `#NTE蜈ｬ蠑醜繝昴せ繝・

謚慕ｨｿ譌･譎・: ${Utils.formatToViewDate(new Date(embed.timestamp))}

${embed.description}`;

    const hasExceeded = body.length > Bluesky.MAX_BODY_LENGTH;

    return {
      body: `${hasExceeded ? body.slice(0, Bluesky.MAX_BODY_LENGTH) + '窶ｦ' : body}`,
      images: createImage(embed.image?.url ? [embed.image.url] : []),
    }
  };
})();


