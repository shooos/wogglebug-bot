namespace Bluesky {
  export const MAX_IMAGE_SIZE = 976000;

  export const Result = {
    pending: 'pending',
    success: 'success',
    failure: 'failure',
  } as const;

  export type Result = (typeof Result)[keyof typeof Result];

  export const BotType = {
    regular: 'regular',
    tester: 'tester',
  } as const;

  export type BotType = (typeof BotType)[keyof typeof BotType];

  export interface AttachImage {
    altText: string;
    blob: GoogleAppsScript.Base.Blob;
    aspectRatio: {
      width: number;
      height: number;
    };
  }

  export interface Facet {
    index: {
      byteStart: number,
      byteEnd: number
    };
    features: {
      $type: string,
      tag: string
    }[]
  }

  export interface Message {
    body: string;
    images: AttachImage[];
    linkUrl?: string;
  }

  export interface Functions {
    createSession(): string;
    uploadImage(token: string, blob: GoogleAppsScript.Base.Blob): GoogleAppsScript.Base.Blob | null;
    postMessage(token: string, message: Message, postedBy: BotType): Result;
    detectFacets(text: string): Facet[] | null;
  }
}

const Bsky: Partial<Bluesky.Functions> = {};
