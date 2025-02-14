namespace Genshin {
  export interface ReleasePost {
    id: string;
    body: string;
  }

  export interface ImaginariumTheaterInfo {
    date: Date;
    elementals: string[];
    principalCastMembers: string[];
    alternateCastMembers: string[];
    articleUrl: string;
  }

  export interface ImaginariumTheaterMessageModel {
    date: string;
    elementals: string[];
    principalCastMembers: string[];
    alternateCastMembers: string[];
    articleUrl: string;
  }

  interface PropertyRepository {
    getLastFetchedId(): string;
    saveLastFetchedId(id: string): void;
  }

  interface ImaginariumTheater {
    extractInfo(releasePost: ReleasePost): ImaginariumTheaterInfo[];
    save(info: ImaginariumTheaterInfo): void;
    subscribe(): void;
    notice(token: string, botType: Bluesky.BotType): void;
    start(token: string, currentDate: Date, botType: Bluesky.BotType): void;
    buildNoticeMessage(info: ImaginariumTheaterMessageModel): Bluesky.Message;
    buildStartMessage(info: ImaginariumTheaterMessageModel): Bluesky.Message;
  }

  export interface SpiralAbyssImageData {
    fileName: string;
    imageType: string;
    base64: string;
  }

  interface SpiralAbyss {
    createImage(hours: number): void;
    saveImage(imageData: SpiralAbyssImageData): void;
    countDown(currentDate: Date): void;
    countDownCallback(fileId: string, hours: number): void;
    buildMessage(hours: number, image: GoogleAppsScript.Base.Blob): Bluesky.Message;
  }

  interface StarglitterExchange {
    buildMessage(currentDate: Date): Bluesky.Message;
    subscribe(currentDate: Date): Bluesky.Message | null;
  }

  export interface Functions {
    propertyRepository: PropertyRepository;
    fetchReleases(lastFetchedId: string): ReleasePost[];
    imaginariumTheater: Partial<ImaginariumTheater>;
    spiralAbyss: Partial<SpiralAbyss>;
    starglitterExchange: Partial<StarglitterExchange>;
  }
};

const GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID = '1lKdQLkBlvw_WA1i-KccjbRelHb5rlkfL';

const Genshin: Partial<Genshin.Functions> = {};
