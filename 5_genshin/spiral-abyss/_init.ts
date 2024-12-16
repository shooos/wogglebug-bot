(() => {
  Genshin.spiralAbyss = {};
})();

function saveSpiralAbyssImage({ fileName, imageType, base64 }: Genshin.SprialAbyssImageData): string {
  Logger.log(`Start to save spiral abyss image | FileName=${fileName}`);

  const imagesFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);

  const encoded = base64.replace('data:image/png;base64,', '');
  const decoded = Utilities.base64Decode(encoded);
  const blob = Utilities.newBlob(decoded, imageType, fileName);

  const created = imagesFolder.createFile(blob);
  const fileId = created.getId();

  Logger.log(`Completed save spiral abyss image | FileId=${fileId}`);

  return fileId;
}

function successSaveSpiralAbyssImage(fileId: string) {
  Logger.log(`Completed save spiral abyss image | FileId=${fileId}`);
}

function failureSaveSpiralAbyssImage(error: Error) {
  throw new Error(`Failed to save spiral abyss image | Reason=${error.message}`);
}
