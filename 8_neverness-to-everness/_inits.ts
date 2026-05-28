namespace NTE {
  export interface Functions {
    subscribe(after: Date): void;
    buildMessage(message: Discord.Message): Bluesky.Message;
  }
}

const Nte: Partial<NTE.Functions> = {};
