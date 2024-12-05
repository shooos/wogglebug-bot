namespace HoYo {
  export const Game = {
    genshin: 'genshin',
    zzz: 'zzz',
    starRail: 'starRail',
  } as const;
  export type Game = (typeof Game)[keyof typeof Game];

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
    buildMessages(contents: Content[]): Bluesky.Message[];
  }

  export interface Games {
    Genshin: Partial<Functions> & Partial<{
      getLastPostedEventId(): string;
      saveLastPostedEventId(id: string): void;
      fetchNewAlivalEvents(lastPostedId: string): Event[];
      buildEventMessages(events: Event[]): Bluesky.Message[];
    }>;
    ZZZ: Partial<Functions>;
    StarRail: Partial<Functions>;
  }

  export interface Subscriber {
    subscribe(): void;
  }
}

const HoYoLAB: HoYo.Games = {
  Genshin: {},
  ZZZ: {},
  StarRail: {},
};

const HoYoLABSubscriber: Partial<HoYo.Subscriber> = {};
