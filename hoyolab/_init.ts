namespace HoYo {
  export interface Content {
    id: string;
    subject: string;
    createdAt: Date;
    articleUrl: string;
    imageUrls: string[];
    body: string;
  }

  export interface Event {
    id: string;
    subject: string;
    startAt: Date;
    endAt: Date;
    status: EventStatus;
    articleUrl: string;
    imageUrls: string[];
    createdAt: Date;
  }

  export const EventStatus = {
    INPROGRESS: 'INPROGRESS',
    ACCEPTING: 'ACCEPTING',
    CLOSED: 'CLOSED',
  } as const;
  export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

  interface Functions {
    getLastPostedId(): string;
    saveLastPostedId(id: string): void;
    getFaildPostIds(): string[];
    saveFaildPostIds(ids: string[]): void;
    fetchNewAlivals(lastPostedId: string): Content[];
  }

  export interface Games {
    Genshin: Partial<Functions> & Partial<{
      getLastPostedEventId(): string;
      saveLastPostedEventId(id: string): void;
      fetchNewAlivalEvents: (lastPostedId: string) => Event[];
    }>;
    ZZZ: Partial<Functions>;
    StarRail: Partial<Functions>;
  }
}

const HoYoLAB: HoYo.Games = {
  Genshin: {},
  ZZZ: {},
  StarRail: {},
};
