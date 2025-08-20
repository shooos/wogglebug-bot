(() => {
  Genshin.spiralAbyss = {};
})();

function toDataUrl_(fileId: string): string {
  const blob = DriveApp.getFileById(fileId).getBlob();
  return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
}

function getImageDataUrl(): string {
  outputLogToFile(`Start to get image data url`);
  const now = new Date();
  const imageIds = [
    '1lC8As90m_vQGV-bCDYpFinAz9ftJTrB7',
    '1acFlbzQb9MORW1BR5FbKHtSff46joKLJ',
    '1OnD2xOvD8rpHUUPESQdtaQHAe5Vzyvop',
    '1TmoJPnrggL-qZFac8W7LSysyIwGNDeh8',
  ];
  const index = Math.floor(now.getTime() % imageIds.length);

  const dataUrl = toDataUrl_(imageIds[index]);
  outputLogToFile(`Created spiral abyss image data url | DataUrlLength=${dataUrl.length}`);

  return dataUrl;
}

function saveSpiralAbyssImage({ fileName, imageType, base64 }: Genshin.SpiralAbyssImageData): string {
  outputLogToFile(`Start to save spiral abyss image | FileName=${fileName}`);

  const imagesFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);

  const encoded = base64.replace('data:image/png;base64,', '');
  const decoded = Utilities.base64Decode(encoded);
  const blob = Utilities.newBlob(decoded, imageType, fileName);

  const created = imagesFolder.createFile(blob);
  const fileId = created.getId();

  outputLogToFile(`Completed save spiral abyss image | FileId=${fileId}`);

  return fileId;
}

function successSaveSpiralAbyssImage(fileId: string, hours: number) {
  Genshin.spiralAbyss!.countDownCallback!(fileId, hours);
}

function failureSaveSpiralAbyssImage(error: Error) {
  outputLogToFile(`Failed to save spiral abyss image | Reason=${error.message}`);
}

function openLogFile(now: Date): GoogleAppsScript.Drive.File {
  const logDir = DriveApp.getFolderById('1qkMmXsPo0qhNX8AEnD9QorlUVWuxXxZK');
  const yyyym = `${now.getFullYear()}${now.getMonth()}`;
  const fileName = `log_${yyyym}.txt`;
  const logFiles = logDir.getFilesByName(fileName);

  if (logFiles.hasNext()) {
    return logFiles.next();
  } else {
    return logDir.createFile(fileName, '');
  }
}

const logFile = openLogFile(new Date());

function outputLogToFile(log: string): void {
  try {
    const timestamp = Utils.formatToViewDate(new Date());
    const logMessage = `${timestamp} --- ${log}`;
    const logs = logFile.getBlob().getDataAsString();
    const newContent = logMessage.concat(`\n${logs}`);
    logFile.setContent(newContent);
  } catch (e) {
    Utilities.sleep(50);
    outputLogToFile(log);
  }
}
