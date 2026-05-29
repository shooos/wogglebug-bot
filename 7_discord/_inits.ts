namespace Discord {
  const CLIENT_ID = PropertiesService.getScriptProperties().getProperty('DISCORD_OAUTH2_CLIENT_ID');
  const CLIENT_TOKEN = PropertiesService.getScriptProperties().getProperty('DISCORD_OAUTH2_CLIENT_TOKEN');
  export const BOT_TOKEN = PropertiesService.getScriptProperties().getProperty('DISCORD_BOT_TOKEN');
  export const BASE_URL = 'https://discord.com/api/v10';

  export interface Message {
    id: string;
    content: string;
  }

  export interface Functions {
    getMessages(channelId: string, after: string): Message[];
  }
}

const Dsc: Partial<Discord.Functions> = {};
