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
    extractInfo(releasaePost: ReleasePost): ImaginariumTheaterInfo[];
    save(info: ImaginariumTheaterInfo): void;
    subscribe(): void;
    notice(token: string, botType: Bluesky.BotType): void;
    buildMessage(info: ImaginariumTheaterMessageModel): Bluesky.Message;
  }

  interface SpiralAbyss {
    createImage(hours: number): GoogleAppsScript.Drive.File;
    countDown(token: string, currentDate: Date): void;
    buildMessage(hours: number, image: GoogleAppsScript.Base.Blob): Bluesky.Message;
  }

  export interface Functions {
    propertyRepository: PropertyRepository;
    fetchReleases(lastFetchedId: string): ReleasePost[];
    imaginariumTheater: Partial<ImaginariumTheater>;
    spiralAbyss: Partial<SpiralAbyss>;
  }
};

const Genshin: Partial<Genshin.Functions> = {};
