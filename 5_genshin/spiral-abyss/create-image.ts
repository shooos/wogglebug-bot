(() => {
  const createImageClientUrl = 'https://script.google.com/macros/s/AKfycbwW0BCF8WTLRB5wO0D8fe542wzzQ4sCSkLJPrJ8SKvzT1C9lYAA1i6QwqAVjCoMqNvgIw/exec';

  function toDataUrl(fileId: string): string {
    const blob = DriveApp.getFileById(fileId).getBlob();
    return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
  }

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    const imageDataUrl = toDataUrl('1ESTC71ucNOR-ctKaFXYbadzjZfL_ojLH');
    const hoursPositionX = hours < 10 ? 320 : 260;

    UrlFetchApp.fetch(createImageClientUrl);

    const imageFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);
    const imageFile = imageFolder.getFiles().next();

    Logger.log(`Completed create spiral abyss image`);

    return imageFile;
  }
})();
