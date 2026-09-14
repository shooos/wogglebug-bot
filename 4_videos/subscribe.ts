(() => {
  VideosSubscriber.subscribe = () => {
    const lastChecked = Videos.getLastCheckedPublishedAt!();
    const videos = Videos.fetchGenshinOfficialVideos!(lastChecked);
    const messages = Videos.buildMessages!(videos.toReversed());

    if (!messages.length) return;

    try {
      const token = Bsky.createSession!();
      const results = messages.map(message => Bsky.postMessage!(token, message, Bluesky.BotType.regular));
      const failedCount = results.filter(result => result !== Bluesky.Result.success).length;

      if (failedCount > 0) {
        Utils.error(`Failed posting video messages | FailedCount=${failedCount}, TotalCount=${messages.length}`);
        return;
      }
    } catch (error) {
      Utils.error(`Failed posting video messages | Error=${error}`);
      return;
    }

    if (videos.length) Videos.saveLastCheckedPublishedAt!(videos[0].published);
  }
})();
