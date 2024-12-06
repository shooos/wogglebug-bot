(() => {
  Genshin.imaginariumTheater.save = (info) => {
    Logger.log(`Start saving imaginarium theater information | Date=${info.date}`);

    const activeSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = activeSheet.getSheetByName('幻想シアター');
    const nextRow = sheet.getLastRow() + 1;

    sheet.getRange(nextRow, 1).setValue(Utilities.formatDate(info.date, 'JST', 'M月d日'));

    sheet.getRange(nextRow, 2).setValue(info.elementals[0]);
    sheet.getRange(nextRow, 3).setValue(info.elementals[1]);
    sheet.getRange(nextRow, 4).setValue(info.elementals[2]);

    sheet.getRange(nextRow, 5).setValue(info.principalCastMembers[0]);
    sheet.getRange(nextRow, 6).setValue(info.principalCastMembers[1]);
    sheet.getRange(nextRow, 7).setValue(info.principalCastMembers[2]);
    sheet.getRange(nextRow, 8).setValue(info.principalCastMembers[3]);
    sheet.getRange(nextRow, 9).setValue(info.principalCastMembers[4]);
    sheet.getRange(nextRow, 10).setValue(info.principalCastMembers[5]);

    sheet.getRange(nextRow, 11).setValue(info.alternateCastMembers[0]);
    sheet.getRange(nextRow, 12).setValue(info.alternateCastMembers[1]);
    sheet.getRange(nextRow, 13).setValue(info.alternateCastMembers[2]);
    sheet.getRange(nextRow, 14).setValue(info.alternateCastMembers[3]);

    sheet.getRange(nextRow, 15).setValue(info.articleUrl);

    Logger.log(`Success saving imageinarium theater information`);
  }
})();
