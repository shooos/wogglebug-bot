(() => {
  const credencials = {
    identifier: PropertiesService.getScriptProperties().getProperty('BLUESKY_HANDLE'),
    password: PropertiesService.getScriptProperties().getProperty('BLUESKY_PASSWORD'),
  }

  const url = 'https://bsky.social/xrpc/com.atproto.server.createSession';

  Bsky.createSession = (): string => {
    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(credencials),
      muteHttpExceptions: true
    });
    const responseCode = response.getResponseCode();
    if (responseCode < 200 || responseCode >= 300) {
      const error = `Failed creating Bluesky session | StatusCode=${responseCode}`;
      Utils.error(error);
      throw new Error(error);
    }

    let result: unknown;
    try {
      result = JSON.parse(response.getContentText());
    } catch (error) {
      Utils.error(`Failed creating Bluesky session | Reason=InvalidResponse, Error=${error}`);
      throw error;
    }

    const accessJwt = (result as { accessJwt?: unknown }).accessJwt;
    if (typeof accessJwt !== 'string' || accessJwt.length === 0) {
      const error = `Failed creating Bluesky session | Reason=MissingAccessJwt`;
      Utils.error(error);
      throw new Error(error);
    }

    return accessJwt;
  }
})();
