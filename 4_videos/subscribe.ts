(() => {
  VideosSubscriber.subscribe = () => {
    const lastChecked = Videos.getLastCheckedPublishedAt!();
    const videos = Videos.fetchGenshinOfficialVideos!(lastChecked);
    const messages = Videos.buildMessages!(videos.toReversed());

    if (!messages.length) return;

    const token = Bsky.createSession!();
    messages.forEach(message => {
      Bsky.postMessage!(token, message, Bluesky.BotType.regular);
    });

    if (videos.length) Videos.saveLastCheckedPublishedAt!(videos[0].published);
  }
})();
