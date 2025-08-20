(() => {
  function hoursDiff(dateInitial: Date, dateFinal: Date): number {
    return Math.floor((dateFinal.getTime() - dateInitial.getTime()) / (60 * 60 * 1000));
  }

  Genshin.spiralAbyss!.countDown = (currentDate) => {
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

    Genshin.spiralAbyss!.createImage!(hours);
  }

  Genshin.spiralAbyss!.countDownCallback = (fileId, hours) => {
    outputLogToFile(`Called to count down callback process | FileId=${fileId}, Hours=${hours}`);
    const imageFile = DriveApp.getFileById(fileId);

    const message = Genshin.spiralAbyss!.buildMessage!(hours, imageFile.getBlob());
    const token = Bsky.createSession!();
    Bsky.postMessage!(token, message, Bluesky.BotType.regular);

    imageFile.setTrashed(true);

    outputLogToFile(`Spiral Abyss notification is completed`);
  }
})();
