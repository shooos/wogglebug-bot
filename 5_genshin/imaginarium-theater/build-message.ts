(() => {
  const imageBlob = DriveApp.getFileById('1AUMe5huFFIR9_Hk7WfspUFEg6cG-AqPO').getBlob();
  const imageSize = Image.getRectangleSize(imageBlob);

  function attachElementalIcon(elemental: string): string {
    switch (elemental) {
      case '炎':
        return '炎🔥';
      case '水':
        return '水💧';
      case '雷':
        return '雷⚡';
      case '氷':
        return '氷❄';
      case '草':
        return '草🌿';
      case '岩':
        return '岩🪨';
      case '風':
        return '風🌀';
      default:
        return elemental;
    }
  }

  Genshin.imaginariumTheater.buildMessage = (info) => {
    const body = `📢 #原神 ${info.date}からの幻想シアターは…👉

【元素】 ${attachElementalIcon(info.elementals[0])}、${attachElementalIcon(info.elementals[1])}、${attachElementalIcon(info.elementals[2])}

【開幕キャスト】
🎬 ${info.principalCastMembers[0]}
🎬 ${info.principalCastMembers[1]}
🎬 ${info.principalCastMembers[2]}
🎬 ${info.principalCastMembers[3]}
🎬 ${info.principalCastMembers[4]}
🎬 ${info.principalCastMembers[5]}

【特別招待キャスト】
📌 ${info.alternateCastMembers[0]}
📌 ${info.alternateCastMembers[1]}
📌 ${info.alternateCastMembers[2]}
📌 ${info.alternateCastMembers[3]}

参照元： ${info.articleUrl}`;

    return {
      body,
      images: [{
        altText: 'Imaginarium Theater',
        blob: imageBlob,
        aspectRatio: {
          width: imageSize.width,
          height: imageSize.height,
        }
      }],
    };
  };
})();