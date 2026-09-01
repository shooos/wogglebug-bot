(() => {
  function buildLeyLineDeorders(data: Genshin.SpiralAbyssInfo['leyLineDisorders']): string {
    let text = '';
    if (data.floor11.length) {
      text = text.concat(`劇 隨ｬ11螻､縺ｮ蝨ｰ閼育焚蟶ｸ
${data.floor11.join('\n')}
`);
    }

    if (data.floor12.length) {
      if (data.floor11.length) text.concat('\n');
      text = text.concat(`劇 隨ｬ12螻､縺ｮ蝨ｰ閼育焚蟶ｸ
${data.floor12.join('\n')}
`);
    }

    if (!data.floor11.length && !data.floor12.length) {
      text = text.concat(`蝨ｰ閼育焚蟶ｸ縺ｯ縺ゅｊ縺ｾ縺帙ｓ\n`);
    }

    return text;
  }

  Genshin.spiralAbyss!.save = (info) => {
    Utils.log(`Start saving Spiral Abyss information | Date=${info.date}`);

    const activeSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = activeSheet.getSheetByName('豺ｱ蠅・楴譌・);

    if (!sheet) throw new Error('Spreadsheet Error | Sheet is not found.');

    const nextRow = sheet.getLastRow() + 1;

    sheet.getRange(nextRow, 1).setValue(Utilities.formatDate(info.date, 'JST', 'M譛・譌･'));

    const informationText = `${buildLeyLineDeorders(info.leyLineDisorders)}
剣 ${info.blessingOfTheAbyssMoon}`;

    sheet.getRange(nextRow, 2).setValue(informationText);
    sheet.getRange(nextRow, 3).setValue(info.articleUrl);

    Utils.log(`Success saving Spiral Abyss information`);
  }
})();


