namespace Video {
  export interface VideoInfo {
    id: string;
    url: string;
    title: string;
    published: Date;
    thumbnailUrl: string;
  }

  export interface Functions {
    getLastCheckedPublishedAt(): Date;
    saveLastCheckedPublishedAt(value: Date): void;
    fetchGenshinOfficialVideos(lastCheckedPublishedAt: Date): VideoInfo[];
    buildMessages(videoInfos: VideoInfo[]): Bluesky.Message[];
  }
}

const Videos: Partial<Video.Functions> = {};
