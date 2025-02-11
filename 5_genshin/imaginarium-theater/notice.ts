(() => {
  const MONTH_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

  function openSheet(): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = spreadSheet.getSheetByName('幻想シアター');

    if (!sheet) throw new Error('Failed to get sheet | SheetName=幻想シアター');

    return sheet;
  }

  function getLastRowDateValue(sheet: GoogleAppsScript.Spreadsheet.Sheet): string {
    return sheet.getRange(sheet.getLastRow(), 1).getDisplayValue();
  }

  function getTargetMonthRow(targetMonth: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): number {
    const lastRowRange = sheet.getRange(sheet.getLastRow(), 1);
    const date = `${targetMonth}月1日`;

    let range = lastRowRange;
    let row = range.getRowIndex();

    if (range.getDisplayValue() === date) {
      return row;
    }

    do {
      range = range.getNextDataCell(GoogleAppsScript.Spreadsheet.Direction.UP);
      row = range.getRowIndex();
    } while (range.getDisplayValue() !== date);

    return row;
  }

  Genshin.imaginariumTheater!.notice = (token, botType) => {
    Logger.log(`Start to notice of Imaginarium theater information`);

    const sheet = openSheet();
    const lastRowDateValue = getLastRowDateValue(sheet);
    const match = lastRowDateValue.match(/(\d+)月/);
    if (!match) throw new Error('Failed to get last row month');

    const lastRowMonth = parseInt(match[1]);

    const currentMonth = (new Date()).getMonth() + 1;
    const currentMonthIndex = MONTH_LIST.findIndex(m => m == currentMonth);

    const monthDiff = MONTH_LIST.slice(currentMonthIndex).findIndex(m => m === lastRowMonth);

    Logger.log(`Calculated variables | LastRowMonth=${lastRowMonth}, CurrentMonth=${currentMonth}, MonthDiff=${monthDiff}`);

    const lastRow = sheet.getLastRow();
    let row = lastRow;
    if (monthDiff > 1) {
      row = lastRow - (monthDiff - 1);
    }

    if (monthDiff > 0) {
      const message = Genshin.imaginariumTheater!.buildMessage!({
        date: sheet.getRange(row, 1).getDisplayValue(),
        elementals: sheet.getRange(row, 2, 1, 3).getValues()[0],
        principalCastMembers: sheet.getRange(row, 5, 1, 6).getValues()[0],
        alternateCastMembers: sheet.getRange(row, 11, 1, 4).getValues()[0],
        articleUrl: sheet.getRange(row, 15).getValue(),
      });

      Bsky.postMessage!(token, message, botType);

      Logger.log('Finish to notice of Imaginarium theater information');
    } else {
      Logger.log(`No message to notify`);
    }
  }

  Genshin.imaginariumTheater!.start = (token, currentDate, botType) => {
    Logger.log(`Start to notice of open Imaginarium theater information`);

    const sheet = openSheet();
    const row = getTargetMonthRow(currentDate.getMonth() + 1, sheet);

    const message = Genshin.imaginariumTheater!.buildMessage!({
      date: sheet.getRange(row, 1).getDisplayValue(),
      elementals: sheet.getRange(row, 2, 1, 3).getValues()[0],
      principalCastMembers: sheet.getRange(row, 5, 1, 6).getValues()[0],
      alternateCastMembers: sheet.getRange(row, 11, 1, 4).getValues()[0],
      articleUrl: sheet.getRange(row, 15).getValue(),
    });

    Bsky.postMessage!(token, message, botType);
  }
})();
