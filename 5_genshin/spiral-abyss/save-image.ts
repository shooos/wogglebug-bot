(() => {
  const folderId = '1lKdQLkBlvw_WA1i-KccjbRelHb5rlkfL';

  Genshin.spiralAbyss.saveImage = ({ fileName, imageType, base64 }) => {
    const imagesFolder = DriveApp.getFolderById(folderId);

    const encoded = base64.replace('data:image/png;base64,', '');
    const decoded = Utilities.base64Decode(encoded);
    const blob = Utilities.newBlob(decoded, imageType, fileName);

    imagesFolder.createFile(blob);
  }
})();
