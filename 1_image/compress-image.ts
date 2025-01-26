(() => {
  const API_KEY = PropertiesService.getScriptProperties().getProperty(`TinyPNG_API_KEY`);
  const authorization = Utilities.base64Encode(`api:${API_KEY}`, Utilities.Charset.UTF_8);
  const headers = {
    Authorization: `Basic ${authorization}`,
  };
  const compressUrl = 'https://api.tinify.com/shrink';
  const MAX_RETRY = 3;

  function fetchCompressedImage(location: string): GoogleAppsScript.Base.Blob | null {
    Logger.log(`Start fetching compressed image | Location=${location}`);

    const response = UrlFetchApp.fetch(location, { method: 'get' });

    if (response.getResponseCode() !== 200) {
      Logger.log(`Failed fetching compressed image | StatusCode=${response.getResponseCode()}`);
      return null;
    }

    return response.getBlob();
  }

  function executeCompression(target: GoogleAppsScript.Base.Blob): GoogleAppsScript.Base.Blob | null {
    try {
      const response = UrlFetchApp.fetch(compressUrl, {
        method: 'post',
        headers,
        payload: target,
      });

      if (response.getResponseCode() == 201) {
        const compressedImageLocation = response.getHeaders()['Location'];
        const compressed = fetchCompressedImage(compressedImageLocation);

        Logger.log(`Success compressing image | ImageSize=${compressed.getBytes().length}`);

        return compressed;
      } else {
        return null;
      }
    } catch (e) {
      Logger.log('Failed to compress image | Error=%s', e);
      return null;
    }
  }

  Image.compress = (target, size) => {
    Logger.log(`Start compressing image | ImageSize=${target.getBytes().length}, TargetSize=${size}`);


    let retryCount = 0;
    let compressed = target;
    do {
      compressed = executeCompression(compressed);
      if (compressed === null || MAX_RETRY < retryCount) return;
      retryCount++;
    } while (compressed.getBytes().length > size);

    return compressed;
  }
})();
