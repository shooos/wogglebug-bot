namespace DISCORD {
  export interface Message {
    id: string;
    content: string;
    author: {
      id: string;
      bot?: boolean;
    };
    embeds?: Embed[];
  }

  interface Embed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    image?: {
      url: string;
      height?: number;
      width?: number;
    };
  }

  export interface Functions {
    kickGithubAction(): void;
  }
}

const Discord: Partial<DISCORD.Functions> = {};
