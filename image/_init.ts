interface ImageFunctions {
  getRectangleSize(target: GoogleAppsScript.Base.Blob): { width: number, height: number };
  compress(target: GoogleAppsScript.Base.Blob): GoogleAppsScript.Base.Blob;
}

const Image: Partial<ImageFunctions> = {};

// 外部ライブラリ ImgApp を利用するための無理やり型定義
declare const ImgApp: {
  getSize(blob: GoogleAppsScript.Base.Blob): {
    identification: string;
    width: number;
    height: number;
    filesize: number;
  };
};
