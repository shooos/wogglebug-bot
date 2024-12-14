(() => {
  function hoursDiff(dateInitial: Date, dateFinal: Date): number {
    return Math.floor((dateFinal.getTime() - dateInitial.getTime()) / (60 * 60 * 1000));
  }

  Genshin.spiralAbyss.countDown = (token, currentDate) => {
    Logger.log(`Start to count down notification of Spiral Abyss | CurrentDate=${Utils.formatToViewDate(currentDate)}`);

    const day16 = new Date()
    day16.setDate(16);
    day16.setHours(5, 0, 0);

    const hours = hoursDiff(currentDate, day16);

    Logger.log(`Count-down Spiral Abyss | RemainingHours=${hours}`);

    if (hours <= 0 || hours > 72) {
      Logger.log(`No need to notification`);
      return null;
    }

    const file = Genshin.spiralAbyss.createImage(hours);
    const message = Genshin.spiralAbyss.buildMessage(hours, file.getBlob());

    Bsky.postMessage(token, message, Bluesky.BotType.regular);

    file.setTrashed(true);

    Logger.log(`Spiral Abyss notification is completed`);
  }
})();
