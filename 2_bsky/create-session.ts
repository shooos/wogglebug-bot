(() => {
  const credencials = {
    identifier: PropertiesService.getScriptProperties().getProperty('BLUESKY_HANDLE'),
    password: PropertiesService.getScriptProperties().getProperty('BLUESKY_PASSWORD'),
  }

  const url = 'https://bsky.social/xrpc/com.atproto.server.createSession';

  Bsky.createSession = (): string => {
    const response = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify(credencials) });
    const contentText = response.getContentText();
    const result = JSON.parse(contentText);

    return result.accessJwt;
  }
})();
