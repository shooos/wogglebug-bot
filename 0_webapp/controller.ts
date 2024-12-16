function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  Logger.log(`Start to get create image app`);

  const template = HtmlService.createTemplateFromFile('5_genshin/spiral-abyss/create-image-client');
  template.hours = parseInt(e.parameter.hours);
  const output = template.evaluate();

  Logger.log(`Generated html output`);

  return output;
}

function clientLogger(message: string): void {
  Logger.log(message);
}
