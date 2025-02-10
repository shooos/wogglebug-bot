namespace DailyInfo {
  export interface Functions {
    loginBonus(currentDate: Date): Bluesky.Message | null;
    weeklyMessage(currentDate: Date): Bluesky.Message | null;
    domainMessages(currentDate: Date): Bluesky.Message[];
  }
}

const DailyInfo: Partial<DailyInfo.Functions> = {};
