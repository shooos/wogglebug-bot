(() => {
  const createImageClientUrl = 'https://script.google.com/macros/s/AKfycbxX2zZKQSbdr1zBB0H_jPFePLGCGgyegi1W4kwuO5Avrf-uzRyiJScJxJZb9PtC4La4sg/exec';

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    UrlFetchApp.fetch(`${createImageClientUrl}?hours=${hours}`);

    const imageFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);
    const imageFile = imageFolder.getFiles().next();

    Logger.log(`Completed create spiral abyss image`);

    return imageFile;
  }
})();
