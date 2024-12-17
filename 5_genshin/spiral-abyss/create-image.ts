(() => {
  const latestWebAppId = PropertiesService.getScriptProperties().getProperty('LATEST_WEB_APP_ID');
  const createImageClientUrl = `https://script.google.com/macros/s/${latestWebAppId}/exec`;

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    UrlFetchApp.fetch(`${createImageClientUrl}?hours=${hours}`);

    Logger.log(`Fetched create image client`);
  }
})();
