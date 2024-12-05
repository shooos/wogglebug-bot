(() => {

  interface Payload {
    repo: string;
    collection: string;
    record: Record;
  }

  interface Record {
    text: string;
    createdAt: string;
    facets: Bluesky.Facet[];
    langs: string[];
    embed?: {
      $type: string;
      external?: EmbedExternal;
      images?: EmbedImage[];
    };
  }

  interface EmbedExternal {
    uri: string;
    title: string;
    description: string;
    thumb?: GoogleAppsScript.Base.Blob;
  }

  interface EmbedImage {
    alt: string;
    image: GoogleAppsScript.Base.Blob;
    aspectRatio: {
      width: number;
      height: number;
    };
  }

  const hundle = PropertiesService.getScriptProperties().getProperty('BLUESKY_HANDLE');
  const postUrl = 'https://bsky.social/xrpc/com.atproto.repo.createRecord';
  const enablePost = PropertiesService.getScriptProperties().getProperty('ENABLE_POST');

  function getBotName(botType: Bluesky.BotType): string {
    const propertyKey = `BOT_NAME_${botType.toUpperCase()}`;
    const botName = PropertiesService.getScriptProperties().getProperty(propertyKey);

    if (botName === null) throw new Error(`Failed to get bot name | PropertyKey=${propertyKey}`);

    return botName;
  }

  function initializePayload(text: string, facets: Bluesky.Facet[]): Payload {
    return {
      repo: hundle,
      collection: 'app.bsky.feed.post',
      record: {
        text,
        createdAt: Utils.getUTCNowIsoString(),
        facets,
        langs: ['ja'],
      }
    };
  }

  function createExternal(linkUrl: string, images: Bluesky.AttachImage[]): EmbedExternal {
    const external: EmbedExternal = {
      uri: linkUrl,
      title: Utils.fetchWebsiteTitle(linkUrl),
      description: '',
    }

    if (images && images.length) {
      external.thumb = images[0].blob;
    }

    return external
  }

  function createEmbedImage(image: Bluesky.AttachImage): EmbedImage {
    return {
      alt: image.altText,
      image: image.blob,
      aspectRatio: image.aspectRatio,
    };
  }

  Bsky.postMessage = (token, message, postedBy) => {
    const { body, images, linkUrl } = message;
    Logger.log(`Start posting to bsky | Message=${body.slice(0, 24)}, ImagesCount=${images.length}, LinkUrl=${linkUrl}, PostedBy=${postedBy}`);

    const botName = getBotName(postedBy);

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const text = `${body}\n\nPosted by ${botName}`;
    const facets = Bsky.detectFacets(new Bluesky.UnicodeString(text));

    const data: Payload = initializePayload(text, facets);

    const uploadedImages = images.map(image => {
      const blob = Bsky.uploadImage(token, image.blob);

      if (blob === null) return null;

      return {
        ...image,
        blob,
      };
    }).filter(it => it !== null);

    if (linkUrl) {
      data.record.embed = {
        $type: 'app.bsky.embed.external',
        external: createExternal(linkUrl, uploadedImages),
      };
    } else if (uploadedImages.length) {
      data.record.embed = {
        $type: 'app.bsky.embed.images',
        images: uploadedImages.map(createEmbedImage)
      }
    }

    const payload = JSON.stringify(data);

    Logger.log(`Post to bsky | Payload=${payload}`);

    let result: Bluesky.Result = Bluesky.Result.pending;

    if (enablePost !== '1') {
      Logger.log(`Is disabled posting to bsky`);
      return Bluesky.Result.success;
    }

    try {
      const response = UrlFetchApp.fetch(postUrl, {
        method: 'post',
        contentType: 'application/json',
        headers,
        payload,
      });

      if (response.getResponseCode() >= 400) {
        Logger.log(`Failed posting to bsky | StatusCode=${response.getResponseCode()}`);
        result = Bluesky.Result.failure;
      } else {
        Logger.log(`Succeeded in posting to bsky!`);
        result = Bluesky.Result.success;
      }
    } catch (e) {
      Logger.log(`Failed posting to bsky | Error=${e}`);
      result = Bluesky.Result.failure;
    }

    // 拘束連投を避けるために投稿後しばらく待つ
    Utilities.sleep(5000);

    return result;
  }
})();
