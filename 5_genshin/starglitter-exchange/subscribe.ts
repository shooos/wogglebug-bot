(() => {
  Genshin.starglitterExchange.subscribe = (currentDate) => {
    Logger.log(`Subscribe starglitter exchange characters`);

    if (currentDate.getDate() !== 1) {
      Logger.log(`Unsbscribe starglitter exchange characters`);
      return null;
    }

    return Genshin.starglitterExchange.buildMessage(currentDate);
  }
})();
