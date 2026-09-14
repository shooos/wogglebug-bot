function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  Utils.beginExecution();
  outputLogToFile(`Start doGet`);
  try {
    const output = executeDoGet(e);
    outputLogToFile(`Completed doGet`);
    return output;
  } catch (error) {
    outputLogToFile(`Failed doGet | Error=${error}`);
    throw error;
  }
}

function executeDoGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
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

function isDiscordMessage(value: unknown): value is DISCORD.Message {
  if (typeof value !== 'object' || value === null) return false;

  const message = value as { id?: unknown; author?: unknown; embeds?: unknown };
  if (typeof message.id !== 'string' || message.id.length === 0) return false;
  if (typeof message.author !== 'object' || message.author === null) return false;
  if (typeof (message.author as { id?: unknown }).id !== 'string') return false;
  if (message.embeds !== undefined && !Array.isArray(message.embeds)) return false;

  return true;
}

function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  Utils.beginExecution();
  outputLogToFile(`Start doPost`);
  try {
    const output = executeDoPost(e);
    outputLogToFile(`Completed doPost`);
    return output;
  } catch (error) {
    outputLogToFile(`Failed doPost | Error=${error}`);
    throw error;
  }
}

function executeDoPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const jsonString = e.postData.contents;
  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    outputLogToFile(`Failed to parse JSON | Error=${e} | JSON=${jsonString}`);
    throw new Error(`Failed to parse JSON | Error=${e}`);
  }

  if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every(isDiscordMessage)) {
    outputLogToFile(`Invalid Discord message payload | JSON=${jsonString}`);
    throw new Error(`Invalid Discord message payload`);
  }

  const messages = parsed;

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

  let postFailed = false;
  bskyMessages.reverse().forEach((msg) => {
    try {
      const result = Bsky.postMessage!(
        Bsky.createSession!(),
        msg,
        Bluesky.BotType.regular);

      if (result !== Bluesky.Result.success) {
        postFailed = true;
        outputLogToFile(`Failed to post message to Bluesky | Result=${result}`);
      }
    } catch (error) {
      postFailed = true;
      outputLogToFile(`Failed to post message to Bluesky | Error=${error}`);
    }
  });

  if (postFailed) {
    outputLogToFile(`Skipped updating last read message ID because posting failed`);
    return ContentService.createTextOutput(JSON.stringify({ success: false }));
  }

  PropertiesService.getScriptProperties().setProperty('LAST_READ_ID_NTE', messages[0].id);

  outputLogToFile(`Updated last read message ID | New ID=${messages[0].id}`);

  return ContentService.createTextOutput(JSON.stringify({ success: true }));
}

function clientLogger(message: string): void {
  outputLogToFile(message);
}
