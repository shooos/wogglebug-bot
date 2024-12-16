function doGet(e: GoogleAppsScript.Events.DoGet) {
  Logger.log(`Start to get create image app`);
  return HtmlService.createHtmlOutputFromFile('0_webapp/create-image-client');
}

function clientLogger(message: string): void {
  Logger.log(message);
}
