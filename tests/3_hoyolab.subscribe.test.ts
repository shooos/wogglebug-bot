import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { transpileModule } from 'typescript';
import { describe, expect, it } from 'vitest';

describe('HoYoLAB subscriber cursor handling', () => {
  it('advances the last-posted cursor even when one Bluesky post in the batch fails', () => {
    const source = readFileSync(resolve(__dirname, '../3_hoyolab/subscribe.ts'), 'utf8');
    const javascript = transpileModule(source, {
      compilerOptions: {
        module: 0,
        target: 9,
      },
    }).outputText;

    const savedIds: string[] = [];
    const failedPostBodies: string[] = [];

    const context = {
      Utils: {
        info: () => undefined,
        warn: () => undefined,
        error: () => undefined,
      },
      Bsky: {
        createSession: () => 'token',
        postMessage: (_token: string, message: { body: string }) => {
          if (message.body === 'new-2') {
            failedPostBodies.push(message.body);
            return 'failure';
          }

          return 'success';
        },
        BotType: { regular: 'regular' },
      },
      Bluesky: {
        Result: {
          success: 'success',
          failure: 'failure',
          pending: 'pending',
        },
        BotType: { regular: 'regular' },
      },
      HoYoLAB: {
        Genshin: {
          getLastPostedId: () => 'last-posted',
          fetchNewArrivals: () => [
            { id: 'new-3' },
            { id: 'new-2' },
            { id: 'new-1' },
          ],
          buildMessages: (contents: Array<{ id: string }>) => contents.map((content) => ({ body: content.id })),
          getLastPostedEventId: () => 'last-event',
          fetchNewArrivalEvents: () => [],
          buildEventMessages: () => [],
          saveLastPostedId: (id: string) => {
            savedIds.push(id);
          },
          saveLastPostedEventId: () => undefined,
        },
        ZZZ: {
          getLastPostedId: () => 'last-zzz',
          fetchNewArrivals: () => [],
          buildMessages: () => [],
          saveLastPostedId: () => undefined,
        },
        StarRail: {
          getLastPostedId: () => 'last-rail',
          fetchNewArrivals: () => [],
          buildMessages: () => [],
          saveLastPostedId: () => undefined,
        },
      },
      HoYoLABSubscriber: {},
    };

    runInNewContext(javascript, context);
    context.HoYoLAB.Genshin.buildMessages = (contents: Array<{ id: string }>) => [
      { body: 'new-1' },
      { body: 'new-2' },
      { body: 'new-3' },
    ];

    context.HoYoLABSubscriber.subscribe();

    expect(savedIds).toContain('new-3');
    expect(failedPostBodies).toEqual(['new-2']);
  });
});
