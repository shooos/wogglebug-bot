function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  outputLogToFile(`Start to get create image app`);

  const hours = parseInt(e.parameter.hours);
  if (typeof hours !== 'number') {
    throw new Error(`Hours is not a number | Hours=${hours}`);
  }

  const template = HtmlService.createTemplateFromFile('5_genshin/spiral-abyss/create-image-client');
  template.hours = parseInt(e.parameter.hours);
  const output = template.evaluate();

  outputLogToFile(`Generated html output`);

  return output;
}

function doPost(e: GoogleAppsScript.Events.DoPost): void {
  const jsonString = e.postData.contents;
  let message: Discord.Message;

  try {
    message = JSON.parse(jsonString);
  } catch (e) {
    outputLogToFile(`Failed to parse JSON | Error=${e} | JSON=${jsonString}`);
    throw new Error(`Failed to parse JSON | Error=${e}`);
  }

  outputLogToFile(`Received messages from client | ${message.id}`);

  if (message.author.bot || !message.embeds || message.embeds.length === 0) {
    outputLogToFile(`Message is from bot or has no embeds | Message ID=${message.id}`);
    return;
  }

  const blueskyMessage = Nte.buildMessage!(message);
  outputLogToFile(`Built Bluesky message | Message ID=${message.id} | Body=${blueskyMessage.body}`);
}

function clientLogger(message: string): void {
  outputLogToFile(message);
}
