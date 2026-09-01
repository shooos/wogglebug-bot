(() => {
  const imageBlob = DriveApp.getFileById('1gqqFqbwYWzd5AtzhpJzHgLPwciyixZk0').getBlob();

  function openSheet(): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadSheet = SpreadsheetApp.openById('1T_qYwriDOLRrLWZFW9v0ygF_aj0NtrbpEGnZwltiXPo');
    const sheet = spreadSheet.getSheetByName('豺ｱ蠅・楴譌・);

    if (!sheet) throw new Error('Failed to get sheet | SheetName=豺ｱ蠅・楴譌・);

    return sheet;
  }

  function getTargetMonthRow(targetMonth: number, sheet: GoogleAppsScript.Spreadsheet.Sheet): number {
    const lastRowRange = sheet.getRange(sheet.getLastRow(), 1);
    const date = `${targetMonth}譛・6譌･`;

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
    Utils.log(`Start posting to Bluesky that the Spiral Abyss is renewed`);

    const sheet = openSheet();
    const row = getTargetMonthRow(currentDate.getMonth() + 1, sheet);

    const body = `売豺ｱ蠅・楴譌九′譖ｴ譁ｰ縺輔ｌ縺ｾ縺励◆売

${sheet.getRange(row, 2).getValues()[0]}

莉頑悄繧ょ・蜉帙〒謖代ｂ縺・ｼ≫囈 #蜴溽･杼;

    const message: Bluesky.Message = {
      body,
      images: [createImage()],
    };

    const token = Bsky.createSession!();

    Bsky.postMessage!(token, message, Bluesky.BotType.regular);

    Utils.log(`Finish posting to Bluesky that the Spiral Abyss is renewed`);
  }
})();

