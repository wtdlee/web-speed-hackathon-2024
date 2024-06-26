import path from 'node:path';

import findPackageDir from 'pkg-dir';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return [
    {
      bundle: true,
      clean: true,
      entry: {
        server: path.resolve(PACKAGE_DIR, 'src/server.tsx'),
      },
      env: {
        API_URL: process.env['KOYEB_PUBLIC_DOMAIN']
          ? `https://${process.env['KOYEB_PUBLIC_DOMAIN']}`
          : 'http://localhost:8000',
        NODE_ENV: 'production',
      },
      esbuildOptions(options) {
        options.treeShaking = true;
      },
      format: 'cjs',
      loader: {
        '.webp': 'file',
      },
      metafile: false,
      minify: true,
      noExternal: [/@wsh-2024\/.*/],
      outDir: OUTPUT_DIR,
      shims: true,
      sourcemap: false,
      splitting: true,
      target: 'node20',
      treeshake: true,
    },
  ];
});
