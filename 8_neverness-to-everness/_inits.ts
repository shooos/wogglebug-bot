namespace NTE {
  export const LAST_READ_MESSAGE_ID = PropertiesService.getScriptProperties().getProperty('LAST_READ_ID_NTE');

  export interface Functions {
    subscribe(after: Date): void;
    buildMessage(message: DISCORD.Message): Bluesky.Message;
  }
}

const Nte: Partial<NTE.Functions> = {};
