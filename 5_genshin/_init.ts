namespace Genshin {
  export interface ReleasePost {
    id: string;
    body: string;
  }

  export interface ImagenariumTheaterInfo {
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

  interface ImagenariumTheater {
    extractInfo(releasaePost: ReleasePost): ImagenariumTheaterInfo[];
  }

  export interface Functions {
    propertyRepository: PropertyRepository;
    fetchReleases(lastFetchedId: string): ReleasePost[];
    imagenariumTheater: Partial<ImagenariumTheater>;
  }
};

const Genshin: Partial<Genshin.Functions> = {};
