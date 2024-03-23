import path from 'path-browserify';

export async function preloadImages(): Promise<void> {
  const pathListString = process.env['PATH_LIST'];

  if (!pathListString) {
    return;
  }

  const supportedExtensions = ['.bmp', '.jpg', '.jpeg', '.gif', '.png', '.webp', '.avif'];

  pathListString
    .split(',')
    .filter((imagePath) => supportedExtensions.includes(path.extname(imagePath).toLowerCase()))
    .forEach((imagePath) => preloadImage(imagePath));
}

async function preloadImage(imagePath: string): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    link.crossOrigin = 'anonymous';
    link.setAttribute('fetchPriority', 'high');
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}
