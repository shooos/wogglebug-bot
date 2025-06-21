(() => {
  const imageBlob = DriveApp.getFileById('1gqqFqbwYWzd5AtzhpJzHgLPwciyixZk0').getBlob();

  function openSheet(): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = spreadSheet.getSheetByName('深境螺旋');

    if (!sheet) throw new Error('Failed to get sheet | SheetName=深境螺旋');

    return sheet;
  }

  function getTargetMonthRow(targetMonth: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): number {
    const lastRowRange = sheet.getRange(sheet.getLastRow(), 1);
    const date = `${targetMonth}月16日`;

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

  const createImage = (): Bluesky.AttachImage => {
    const imageSize = Image.getRectangleSize!(imageBlob);

    return {
      altText: `Spiral Abyss`,
      blob: imageBlob,
      aspectRatio: { ...imageSize },
    }
  }

  Genshin.spiralAbyss!.open = (currentDate) => {
    Logger.log(`Start posting to Bluesky that the Spiral Abyss is renewed`);

    const sheet = openSheet();
    const row = getTargetMonthRow(currentDate.getMonth() + 1, sheet);

    const body = `🔄深境螺旋が更新されました🔄

${sheet.getRange(row, 2).getValues()[0]}

今期も全力で挑もう！⚔ #原神`;

    const message: Bluesky.Message = {
      body,
      images: [createImage()],
    };

    const token = Bsky.createSession!();

    Bsky.postMessage!(token, message, Bluesky.BotType.regular);

    Logger.log(`Finish posting to Bluesky that the Spiral Abyss is renewed`);
  }
})();