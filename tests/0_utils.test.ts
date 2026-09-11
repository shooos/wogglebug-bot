import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { transpileModule } from 'typescript';
import { describe, expect, it } from 'vitest';

interface UtilsContext {
  Utils: {
    sendToCloudLogging: (message: string, level?: string) => void;
  };
  requests: Array<{ url: string; options: { payload: string } }>;
}

const loadUtils = (): UtilsContext => {
  const source = readFileSync(resolve(__dirname, '../0_utils.ts'), 'utf8');
  const javascript = transpileModule(source, {
    compilerOptions: {
      module: 0,
      target: 9,
    },
  }).outputText.replace('const Utils =', 'globalThis.__utils =') + '\n__setUtils(globalThis.__utils);';

  const requests: UtilsContext['requests'] = [];
  const context = {
    Utils: { sendToCloudLogging: () => undefined },
    requests,
    __setUtils: (utils: UtilsContext['Utils']) => {
      context.Utils = utils;
    },
  };

  runInNewContext(javascript, {
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: () => 'test-project',
      }),
    },
    UrlFetchApp: {
      fetch: (url: string, options: { payload: string }) => {
        requests.push({ url, options });
        return {
          getResponseCode: () => 200,
          getContentText: () => '',
        };
      },
    },
    ScriptApp: { getOAuthToken: () => 'test-token' },
    console: { log: () => undefined, warn: () => undefined, error: () => undefined },
    __setUtils: context.__setUtils,
  });

  return { Utils: context.Utils, requests };
};

describe('Utils.sendToCloudLogging', () => {
  it('includes a monitored resource in each log entry', () => {
    const { Utils, requests } = loadUtils();

    Utils.sendToCloudLogging('test message', 'WARNING');

    expect(requests).toHaveLength(1);
    const payload = JSON.parse(requests[0].options.payload);
    expect(payload.entries[0]).toMatchObject({
      severity: 'WARNING',
      resource: {
        type: 'global',
        labels: { project_id: 'test-project' },
      },
    });
  });
});