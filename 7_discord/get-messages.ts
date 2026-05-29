(() => {
  Dsc.getMessages = (channelId: string, after: string): Discord.Message[] => {
    const url = `${Discord.BASE_URL}/channels/${channelId}/messages?after=${after}`;
    const response = UrlFetchApp.fetch(url, {
      method: 'get',
      contentType: 'application/json',
      muteHttpExceptions: true,
      headers: {
        Authorization: `Bot ${Discord.BOT_TOKEN}`,
      },
    });

    const statusCode = response.getResponseCode();
    if (statusCode !== 200) {
      Logger.log(`Failed fetching Discord messages | StatusCode=${statusCode}`);
      return [];
    }

    const messages = JSON.parse(response.getContentText());

    return messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
    }));
  };
})();
