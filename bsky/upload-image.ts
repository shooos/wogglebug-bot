(() => {
  const MAX_IMAGE_SIZE = 976000;

  const uploadUrl = 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob';

  function request(
    token: string,
    mimeType: string,
    blob: GoogleAppsScript.Base.Blob
  ): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const requestHeaders = {
      Authorization: `Bearer ${token}`
    }

    return UrlFetchApp.fetch(uploadUrl, {
      method: 'post',
      contentType: mimeType,
      headers: requestHeaders,
      payload: blob,
    });
  }

  Bsky.uploadImage = (token, blob) => {
    const mimeType = blob.getContentType();
    Logger.log(`Start uploading image to bsky | MimeType=${mimeType}`);

    const imageSize = blob.getBytes().length;
    if (imageSize > MAX_IMAGE_SIZE) {
      Logger.log(`Failed to upload image because image is too large | ImageSize=${imageSize}`);
      return null;
    }

    const response = request(token, mimeType, blob);

    if (response.getResponseCode() >= 400) {
      Logger.log(`Failed to upload image because request is failure | StatusCode=${response.getResponseCode()}`);
      return null;
    }

    Logger.log(`Success uploading image to bsky`);

    return response.getBlob();
  }
})();
