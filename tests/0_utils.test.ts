import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { transpileModule } from 'typescript';
import { describe, expect, it } from 'vitest';

interface UtilsContext {
  Utils: {
    sendToCloudLogging: (message: string, level?: string) => void;
    logHttpFailure: (context: string, response: { getResponseCode: () => number; getContentText: () => string }) => void;
  };
  requests: Array<{ url: string; options: { payload: string } }>;
  warnings: string[];
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
  const warnings: string[] = [];
  const context = {
    Utils: { sendToCloudLogging: (_message: string, _level?: string): void => { } },
    requests,
    warnings,
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
    console: {
      log: () => undefined,
      warn: (message: string) => warnings.push(message),
      error: () => undefined,
    },
    __setUtils: context.__setUtils,
  });

  return { Utils: context.Utils, requests, warnings };
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

  it('logs the HTTP response body on request failures', () => {
    const { Utils, warnings } = loadUtils();
    const response = {
      getResponseCode: () => 401,
      getContentText: () => '{"error":"invalid_grant"}',
    };

    Utils.logHttpFailure('Failed creating Bluesky session', response);

    expect(warnings).toEqual([
      expect.stringContaining('StatusCode=401'),
    ]);
    expect(warnings[0]).toContain('Body={"error":"invalid_grant"}');
  });
});