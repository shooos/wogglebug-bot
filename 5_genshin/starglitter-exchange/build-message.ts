(() => {
  const STARGLITTER_EXCHANGE_CHARACTERS = [
    ['フィッシュル', '香菱'],
    ['北斗', 'ノエル'],
    ['凝光', '行秋'],
    ['アンバー', 'レザー'],
    ['リサ', 'ベネット'],
    ['ガイア', 'バーバラ'],
  ];

  const STARGLITTER_EXCHANGE_IMAGE_IDS = [
    '1p6AB7HdqSCaQlPWF_LwoMZEwpy4aPRb3',
    '17BdsBkMtkFf6qWL-fBmhDnvTmybaSqon',
    '1EM4rxUbuOg5ocERKH-2Il7wUiQtAca8m',
    '1RdZHrGOt4e97tIw29M4JYuLE1D5cMVW8',
    '1sDtyH8xQHBHzzVpPWh2RkprrT7ZnMN7R',
    '16KSd4d8DCwvoWd9qyVEHP3NlaXxTwBIs',
  ];

  Genshin.starglitterExchange.buildMessage = (currentDate) => {
    Logger.log(`Start build starglitter exchange message | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const currentMonth = currentDate.getMonth();
    const nextMonth = new Date(currentDate.setMonth(currentMonth + 1)).getMonth();

    const characters = STARGLITTER_EXCHANGE_CHARACTERS.concat(STARGLITTER_EXCHANGE_CHARACTERS);
    const imageIds = STARGLITTER_EXCHANGE_IMAGE_IDS.concat(STARGLITTER_EXCHANGE_IMAGE_IDS);

    const currentChars = characters[currentMonth];
    const nextChars = characters[nextMonth];
    const imageId = imageIds[currentMonth];
    const blob = DriveApp.getFileById(imageId).getBlob();
    const imageSize = Image.getRectangleSize(blob);

    const body = `📢 今月のスターライト交換キャラクターは ${currentChars[0]} & ${currentChars[1]}
👉 来月は ${nextChars[0]} & ${nextChars[1]}

スターライトのご利用は計画的に！ #原神`;

    Logger.log(`Completed build starglitter exchange message | Body=${body}`);

    return {
      body,
      images: [{
        altText: 'Starglitter Exchange',
        blob,
        aspectRatio: {
          width: imageSize.width,
          height: imageSize.height,
        },
      }],
    };
  };
})();
