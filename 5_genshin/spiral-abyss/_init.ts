(() => {
  Genshin.spiralAbyss = {};
})();

function toDataUrl_(fileId: string): string {
  const blob = DriveApp.getFileById(fileId).getBlob();
  return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
}

function getImageDataUrl(): string {
  const dataUrl = toDataUrl_('1ESTC71ucNOR-ctKaFXYbadzjZfL_ojLH');
  Logger.log(`Created spiral abyss image data url | DataUrlLength=${dataUrl.length}`);

  return dataUrl;
}

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
