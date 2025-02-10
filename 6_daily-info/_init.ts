namespace DailyInfo {
  export interface Functions {
    loginBonus(currentDate: Date): Bluesky.Message;
    weeklyMessage(currentDate: Date): Bluesky.Message;
    domainMessages(currentDate: Date): Bluesky.Message[];
  }
}

const DailyInfo: Partial<DailyInfo.Functions> = {};
