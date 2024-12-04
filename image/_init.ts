interface ImageFunctions {
  compress(target: GoogleAppsScript.Base.Blob): GoogleAppsScript.Base.Blob;
}

const Image: Partial<ImageFunctions> = {};
