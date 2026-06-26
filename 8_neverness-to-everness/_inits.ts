namespace NTE {
  export interface Functions {
    subscribe(after: Date): void;
    buildMessage(message: DISCORD.Message): Bluesky.Message;
  }
}

const Nte: Partial<NTE.Functions> = {};
