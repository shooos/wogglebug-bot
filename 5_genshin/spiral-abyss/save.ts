(() => {
  function buildLeyLineDeorders(data: Genshin.SpiralAbyssInfo['leyLineDisorders']): string {
    let text = '';
    if (data.floor11.length) {
      text = text.concat(`🌀 第11層の地脈異常
${data.floor11.join('\n')}
`);
    }

    if (data.floor12.length) {
      if (data.floor11.length) text.concat('\n');
      text = text.concat(`🌀 第12層の地脈異常
${data.floor12.join('\n')}
`);
    }

    if (!data.floor11.length && !data.floor12.length) {
      text = text.concat(`地脈異常はありません\n`);
    }

    return text;
  }

  Genshin.spiralAbyss!.save = (info) => {
    Logger.log(`Start saving Spiral Abyss information | Date=${info.date}`);

    const activeSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = activeSheet.getSheetByName('深境螺旋');

    if (!sheet) throw new Error('Spreadsheet Error | Sheet is not found.');

    const nextRow = sheet.getLastRow() + 1;

    sheet.getRange(nextRow, 1).setValue(Utilities.formatDate(info.date, 'JST', 'M月d日'));

    const informationText = `${buildLeyLineDeorders(info.leyLineDisorders)}
🌕 ${info.blessingOfTheAbyssMoon}`;

    sheet.getRange(nextRow, 2).setValue(informationText);
    sheet.getRange(nextRow, 3).setValue(info.articleUrl);

    Logger.log(`Success saving Spiral Abyss information`);
  }
})();
