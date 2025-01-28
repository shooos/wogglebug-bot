namespace Bluesky {
  export const MAX_IMAGE_SIZE = 976000;
  export const MAX_BODY_LENGTH = 300 - 25 - 1; // 25文字はbot名、1文字は3点リーダ

  export class UnicodeString {
    utf16: string;
    utf8: GoogleAppsScript.Byte[];

    constructor(utf16: string) {
      this.utf16 = utf16
      this.utf8 = this.encode(utf16)
    }

    encode(str): GoogleAppsScript.Byte[] {
      return Utilities.newBlob(str).getBytes();
    }

    // helper to convert utf16 code-unit offsets to utf8 code-unit offsets
    utf16IndexToUtf8Index(i): number {
      return this.encode(this.utf16.slice(0, i)).length;
    }
  }

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
      tag?: string,
      uri?: string,
    }[]
  }

  export interface Message {
    body: string;
    images: AttachImage[];
    linkUrl?: string;
    customFacets?: Facet[];
  }

  export interface Functions {
    createSession(): string;
    uploadImage(token: string, blob: GoogleAppsScript.Base.Blob): GoogleAppsScript.Base.Blob | null;
    /**
     * 渡した内容でポストする。内部で画像のアップロードも行う
     * @param token accessJwt
     * @param message ポストするメッセージ
     * @param postedBy ポストするボットの種類
     */
    postMessage(token: string, message: Message, postedBy: BotType): Result;
    detectFacets(text: UnicodeString): Facet[];
    detectCustomFacet(text: UnicodeString, regex: RegExp, uri: string): Facet;
  }
}

const Bsky: Partial<Bluesky.Functions> = {};
