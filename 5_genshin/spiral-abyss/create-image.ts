(() => {
  const createImageClientUrl = 'https://script.google.com/macros/s/AKfycbxgEFgpXnxZvueLhZ1R1AdDvsN7BHOGakU2YpSLqzYRDw8NsFzNzcdDtlD4IKbxDeGw2g/exec';

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    UrlFetchApp.fetch(`${createImageClientUrl}?hours=${hours}`);

    const imageFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);
    const imageFile = imageFolder.getFiles().next();

    Logger.log(`Completed create spiral abyss image`);

    return imageFile;
  }
})();
