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

function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const jsonString = e.postData.contents;
  let messages: DISCORD.Message[];

  try {
    messages = JSON.parse(jsonString);
  } catch (e) {
    outputLogToFile(`Failed to parse JSON | Error=${e} | JSON=${jsonString}`);
    throw new Error(`Failed to parse JSON | Error=${e}`);
  }

  outputLogToFile(`Received messages from client | Messages=${jsonString}`);

  const lastReadMessageId = PropertiesService.getScriptProperties().getProperty('LAST_READ_ID_NTE');

  outputLogToFile(`Last read message ID | ID=${lastReadMessageId}`);

  const bskyMessages: Bluesky.Message[] = [];

  for (const message of messages) {
    if (!message.embeds || message.embeds.length === 0) {
      outputLogToFile(`Message has no embeds | Message ID=${message.id}`);
      continue;
    }

    if (message.id === lastReadMessageId) {
      outputLogToFile(`Found last read message | ID=${lastReadMessageId}`);
      break;
    }

    const blueskyMessage = Nte.buildMessage!(message);
    outputLogToFile(`Built Bluesky message | Message ID=${message.id}, Body=${blueskyMessage.body}`);

    bskyMessages.push(blueskyMessage);
  }

  bskyMessages.reverse().forEach((msg) => {
    try {
      Bsky.postMessage!(
        Bsky.createSession!(),
        msg,
        Bluesky.BotType.regular);
    } catch (error) {
      outputLogToFile(`Failed to post message to Bluesky | Error=${error}`);
    }
  });

  PropertiesService.getScriptProperties().setProperty('LAST_READ_ID_NTE', messages[0].id);

  outputLogToFile(`Updated last read message ID | New ID=${messages[0].id}`);

  return ContentService.createTextOutput(JSON.stringify({ success: true }));
}

function clientLogger(message: string): void {
  outputLogToFile(message);
}
