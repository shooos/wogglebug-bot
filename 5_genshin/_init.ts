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

  interface PropertyRepository {
    getLastFetchedId(): string;
    saveLastFetchedId(id: string): void;
  }

  interface ImaginariumTheater {
    extractInfo(releasaePost: ReleasePost): ImaginariumTheaterInfo[];
  }

  export interface Functions {
    propertyRepository: PropertyRepository;
    fetchReleases(lastFetchedId: string): ReleasePost[];
    imaginariumTheater: Partial<ImaginariumTheater>;
  }
};

const Genshin: Partial<Genshin.Functions> = {};
