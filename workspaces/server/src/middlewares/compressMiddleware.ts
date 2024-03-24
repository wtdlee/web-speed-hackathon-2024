import { createMiddleware } from 'hono/factory';
import { gzip } from 'pako';

export const compressMiddleware = createMiddleware(async (c, next) => {
  await next();

  if (typeof c.body === 'string') {
    const originalBody = c.body;
    const encodedBody = new TextEncoder().encode(originalBody);
    const compressed = gzip(encodedBody);
    c.res = new Response(compressed, {
      headers: {
        ...Object.fromEntries(c.res.headers),
        'Cache-Control': 'max-age=31536000, immutable',
        'Content-Encoding': 'gzip',
      },
    });
  }
});
