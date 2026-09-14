(() => {
  const API_KEY = PropertiesService.getScriptProperties().getProperty(`TinyPNG_API_KEY`);
  const authorization = Utilities.base64Encode(`api:${API_KEY}`, Utilities.Charset.UTF_8);
  const headers: { [key: string]: string } = {
    Authorization: `Basic ${authorization}`,
  };
  const compressUrl = 'https://api.tinify.com/shrink';

  function fetchCompressedImage(location: string): GoogleAppsScript.Base.Blob | null {
    Utils.info(`Start fetching compressed image | Location=${location}`);

    const response = UrlFetchApp.fetch(location, { method: 'get', muteHttpExceptions: true });
    const responseCode = response.getResponseCode();

    if (responseCode !== 200) {
      Utils.warn(`Failed fetching compressed image | Location=${location}, StatusCode=${responseCode}`);
      return null;
    }

    return response.getBlob();
  }

  function executeResize(compressedImageLocation: string, width: number): GoogleAppsScript.Base.Blob | null {
    Utils.info(`Start resizing image | CompressedImageLocation=${compressedImageLocation}, Width=${width}`);

    headers['Content-Type'] = 'application/json';

    const payload = JSON.stringify({
      resize: {
        method: 'scale',
        width: Math.floor(width),
      }
    });

    try {
      const response = UrlFetchApp.fetch(compressedImageLocation, {
        method: 'post',
        headers,
        payload,
        muteHttpExceptions: true
      });

      if (response.getResponseCode() == 200) {
        const resized = response.getBlob();
        Utils.info(`Success resizing image | ImageSize=${resized.getBytes().length}`);

        return resized;
      } else {
        Utils.warn('Failed resizing image | Location=%s, StatusCode=%s', compressedImageLocation, response.getResponseCode());
        return null;
      }
    } catch (e) {
      Utils.error('Failed resizing image | Location=%s, Error=%s', compressedImageLocation, e);
      return null;
    }
  }

  function executeCompression(target: GoogleAppsScript.Base.Blob, size: number): GoogleAppsScript.Base.Blob | null {
    try {
      const response = UrlFetchApp.fetch(compressUrl, {
        method: 'post',
        headers,
        payload: target,
        muteHttpExceptions: true
      });

      const responseCode = response.getResponseCode();
      if (responseCode == 201) {
        const compressedImageLocation: string = (response.getHeaders() as any)['Location'];
        if (!compressedImageLocation) {
          Utils.error(`Failed compressing image | Reason=MissingLocationHeader`);
          return null;
        }

        let compressedSize: number;
        try {
          compressedSize = JSON.parse(response.getContentText()).output.size;
        } catch (error) {
          Utils.error(`Failed compressing image | Reason=InvalidResponse, Error=${error}`);
          return null;
        }

        Utils.info(`Success compressing image | ImageSize=${compressedSize}`);

        if (compressedSize > size) {
          const resizeRatio = size / compressedSize;
          const width = Image.getRectangleSize!(target).width * resizeRatio;

          return executeResize(compressedImageLocation, width);
        } else {
          return fetchCompressedImage(compressedImageLocation);
        }
      } else {
        Utils.warn(`Failed compressing image | StatusCode=${responseCode}`);
        return null;
      }
    } catch (e) {
      Utils.error('Failed compressing image | Error=%s', e);
      return null;
    }
  }

  Image.compress = (target, size) => {
    Utils.info(`Start compressing image | ImageSize=${target.getBytes().length}, TargetSize=${size}`);

    let retryCount = 0;
    const compressed = executeCompression(target, size);

    if (compressed == null) return null;

    if (compressed.getBytes().length > size) {
      Utils.warn(`Failed compressing image | Reason=Exceeded Size Limit`);
      return null;
    }

    Utils.info(`Finish compressing image | RetryCount=${retryCount}`);
    return compressed;
  }
})();
