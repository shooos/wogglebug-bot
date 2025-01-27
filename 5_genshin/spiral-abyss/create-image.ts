(() => {
  const latestWebAppId = PropertiesService.getScriptProperties().getProperty('LATEST_WEB_APP_ID');
  const createImageClientUrl = `https://script.google.com/macros/s/${latestWebAppId}/exec`;
  const PHANTOM_JS_CLOUD_API_KEY = PropertiesService.getScriptProperties().getProperty('PHANTOM_JS_CLOUD_API_KEY');

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    const requestJson = encodeURIComponent(JSON.stringify({
      url: `${createImageClientUrl}?hours=${hours}`,
      renderType: 'jpg',
    }));
    UrlFetchApp.fetch(`https://PhantomJsCloud.com/api/browser/v2/${PHANTOM_JS_CLOUD_API_KEY}/?request=${requestJson}`);

    Logger.log(`Fetched create image client`);
  }
})();
