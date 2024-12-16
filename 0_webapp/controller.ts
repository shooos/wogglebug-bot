function doGet() {
  return HtmlService.createHtmlOutputFromFile('0_webapp/test');
}

function clientLogger(message: string): void {
  Logger.log(message);
}