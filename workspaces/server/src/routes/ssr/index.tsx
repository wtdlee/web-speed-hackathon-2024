import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { unstable_serialize } from 'swr';

import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';

import { INDEX_HTML_PATH } from '../../constants/paths';

async function createInjectDataStr(): Promise<Record<string, unknown>> {
  const dayOfWeek = getDayOfWeekStr(new Date());

  const releasesPromise = releaseApiClient.fetch({ params: { dayOfWeek } }).then((releases) => ({
    data: releases,
    key: unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } })),
  }));

  const featuresPromise = featureApiClient.fetchList({ query: {} }).then((features) => ({
    data: features,
    key: unstable_serialize(featureApiClient.fetchList$$key({ query: {} })),
  }));

  const rankingPromise = rankingApiClient.fetchList({ query: {} }).then((ranking) => ({
    data: ranking,
    key: unstable_serialize(rankingApiClient.fetchList$$key({ query: {} })),
  }));

  const results = await Promise.all([releasesPromise, featuresPromise, rankingPromise]);

  const json: Record<string, unknown> = {};
  results.forEach(({ data, key }) => {
    json[key] = data;
  });

  return json;
}

let cachedHTMLContent: string | null = null;

async function getHTMLTemplate() {
  if (!cachedHTMLContent) {
    cachedHTMLContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  }
  return cachedHTMLContent;
}

const app = new Hono();

app.get('*', async (c) => {
  const injectData = await createInjectDataStr();
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const htmlContent = await getHTMLTemplate();
    const html = createHTML({ body, htmlContent, injectData, styleTags });

    return c.html(html);
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  } finally {
    sheet.seal();
  }
});

function createHTML({
  body,
  htmlContent,
  injectData,
  styleTags,
}: {
  body: string;
  htmlContent: string;
  injectData: Record<string, unknown>;
  styleTags: string;
}) {
  return htmlContent
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace('<style id="styles"></style>', styleTags)
    .replace(
      '<script id="initial-data" type="application/json"></script>',
      `<script id="initial-data" type="application/json">${jsesc(injectData, {
        isScriptContext: true,
        json: true,
      })}</script>`,
    );
}

export { app as ssrApp };
