import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { transpileModule } from 'typescript';
import { describe, expect, it } from 'vitest';

type BlobStub = { id: string };

interface DomainMessagesContext {
  DailyInfo: {
    domainMessages?: (currentDate: Date) => Array<{
      body: string;
      images: Array<{
        altText: string;
        blob: BlobStub;
        aspectRatio: { width: number; height: number };
      }>;
    }>;
  };
  driveFileIds: string[];
}

const loadDomainMessages = (): DomainMessagesContext => {
  const sourcePath = resolve(__dirname, '../../6_daily-info/domain-messages.ts');
  const source = readFileSync(sourcePath, 'utf8');
  const javascript = transpileModule(source, {
    compilerOptions: {
      module: 0,
      target: 9,
    },
  }).outputText;

  const driveFileIds: string[] = [];
  const context: DomainMessagesContext = {
    DailyInfo: {},
    driveFileIds,
  };

  runInNewContext(javascript, {
    DailyInfo: context.DailyInfo,
    Utils: { info: () => undefined },
    DriveApp: {
      getFileById: (id: string) => {
        driveFileIds.push(id);
        return { getBlob: () => ({ id }) };
      },
    },
    Image: {
      getRectangleSize: () => ({ width: 1200, height: 630 }),
    },
  });

  return context;
};

describe('DailyInfo.domainMessages', () => {
  it('does not notify outside the 8:00-8:14 window', () => {
    const { DailyInfo, driveFileIds } = loadDomainMessages();

    expect(DailyInfo.domainMessages!(new Date(2026, 8, 7, 7, 59))).toEqual([]);
    expect(DailyInfo.domainMessages!(new Date(2026, 8, 7, 8, 15))).toEqual([]);
    expect(driveFileIds).toEqual([]);
  });

  it('sends all talent and weapon material images on Sunday', () => {
    const { DailyInfo, driveFileIds } = loadDomainMessages();

    const messages = DailyInfo.domainMessages!(new Date(2026, 8, 6, 8, 0));

    expect(messages).toHaveLength(2);
    expect(messages[0].body).toContain('日曜日は全開放！天賦素材のおさらい');
    expect(messages[1].body).toContain('日曜日は全開放！武器突破素材のおさらい');
    expect(messages[0].images).toHaveLength(3);
    expect(messages[1].images).toHaveLength(3);
    expect(messages.flatMap(message => message.images).every(image => image.aspectRatio.width === 1200)).toBe(true);
    expect(driveFileIds).toHaveLength(6);
  });

  it('sends Monday talent and weapon material notices with one image each', () => {
    const { DailyInfo, driveFileIds } = loadDomainMessages();

    const messages = DailyInfo.domainMessages!(new Date(2026, 8, 7, 8, 14));

    expect(messages).toHaveLength(2);
    expect(messages[0].body).toContain('忘却の峡谷（モンド）：自由');
    expect(messages[0].body).toContain('荒れ果てた聖跡（スネージナヤ）：慈愛');
    expect(messages[1].body).toContain('セシリアの苗床（モンド）：高塔の王');
    expect(messages[1].body).toContain('妄執の傷跡（スネージナヤ）：蒼星軍勢');
    expect(messages[0].images).toHaveLength(1);
    expect(messages[1].images).toHaveLength(1);
    expect(driveFileIds).toHaveLength(2);
  });
});