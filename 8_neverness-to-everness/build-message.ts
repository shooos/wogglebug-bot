(() => {
  Nte.buildMessage = (message: Discord.Message): Bluesky.Message => {
    const content = message.content;
    const author = message.author;
    const channel = message.channel;

    return {
      content,
      author,
      channel,
      timestamp: new Date(),
    };
  };
})();
