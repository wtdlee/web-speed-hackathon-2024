import { useAsync } from 'react-use';

import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const { value } = useAsync(() => {
    const dpr = window.devicePixelRatio || 1;

    const imageUrl = getImageUrl({
      format: 'webp',
      height: height * dpr,
      imageId,
      width: width * dpr,
    });

    return Promise.resolve(imageUrl);
  }, [height, imageId, width]);

  return value;
};
