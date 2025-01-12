namespace DailyInfo {
  export interface Functions {
    loginBonus(currentDate: Date): Bluesky.Message;
  }
}

const DailyInfo: Partial<DailyInfo.Functions> = {};
