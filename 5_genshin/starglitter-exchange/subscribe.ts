(() => {
  Genshin.starglitterExchange.subscribe = (currentDate) => {
    Utils.log(`Subscribe starglitter exchange characters`);

    if (currentDate.getDate() !== 1 || currentDate.getHours() !== 5 || currentDate.getMinutes() > 14) {
      Utils.log(`Unsbscribe starglitter exchange characters`);
      return null;
    }

    return Genshin.starglitterExchange.buildMessage(currentDate);
  }
})();


