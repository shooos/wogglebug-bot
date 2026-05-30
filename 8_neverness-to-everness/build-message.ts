(() => {
  Nte.buildMessage = (message: Discord.Message): Bluesky.Message => {
    const embed = message.embeds?.[0];

    if (!embed) {
      throw new Error(`Message has no embeds | Message ID=${message.id}`);
    }

    return {
      body: `${embed.description || ''}`,
      images: [],
    }
  };
})();
