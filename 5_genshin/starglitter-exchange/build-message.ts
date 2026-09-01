(() => {
  const STARGLITTER_EXCHANGE_CHARACTERS = [
    ['繝輔ぅ繝・す繝･繝ｫ', '鬥呵廠'],
    ['蛹玲沫', '繝弱お繝ｫ'],
    ['蜃晏・', '陦檎ｧ・],
    ['繧｢繝ｳ繝舌・', '繝ｬ繧ｶ繝ｼ'],
    ['繝ｪ繧ｵ', '繝吶ロ繝・ヨ'],
    ['繧ｬ繧､繧｢', '繝舌・繝舌Λ'],
  ];

  const STARGLITTER_EXCHANGE_IMAGE_IDS = [
    '1p6AB7HdqSCaQlPWF_LwoMZEwpy4aPRb3',
    '17BdsBkMtkFf6qWL-fBmhDnvTmybaSqon',
    '1EM4rxUbuOg5ocERKH-2Il7wUiQtAca8m',
    '1RdZHrGOt4e97tIw29M4JYuLE1D5cMVW8',
    '1sDtyH8xQHBHzzVpPWh2RkprrT7ZnMN7R',
    '16KSd4d8DCwvoWd9qyVEHP3NlaXxTwBIs',
  ];

  Genshin.starglitterExchange!.buildMessage = (currentDate) => {
    Utils.log(`Start build starglitter exchange message | CurrentDate=${Utils.formatDateToIsoString(currentDate)}`);

    const currentMonth = currentDate.getMonth();
    const nextMonth = new Date(currentDate.setMonth(currentMonth + 1)).getMonth();

    const characters = STARGLITTER_EXCHANGE_CHARACTERS.concat(STARGLITTER_EXCHANGE_CHARACTERS);
    const imageIds = STARGLITTER_EXCHANGE_IMAGE_IDS.concat(STARGLITTER_EXCHANGE_IMAGE_IDS);

    const currentChars = characters[currentMonth];
    const nextChars = characters[nextMonth];
    const imageId = imageIds[currentMonth];
    const blob = DriveApp.getFileById(imageId).getBlob();
    const imageSize = Image.getRectangleSize!(blob);

    const body = `討 莉頑怦縺ｮ繧ｹ繧ｿ繝ｼ繝ｩ繧､繝井ｺ､謠帙く繝｣繝ｩ繧ｯ繧ｿ繝ｼ縺ｯ ${currentChars[0]} & ${currentChars[1]}
痩 譚･譛医・ ${nextChars[0]} & ${nextChars[1]}

繧ｹ繧ｿ繝ｼ繝ｩ繧､繝医・縺泌茜逕ｨ縺ｯ險育判逧・↓・・#蜴溽･杼;

    Utils.log(`Completed build starglitter exchange message | Body=${body}`);

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


