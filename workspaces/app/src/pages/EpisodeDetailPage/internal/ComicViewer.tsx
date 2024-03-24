import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const MIN_VIEWER_HEIGHT = 500;
const MAX_VIEWER_HEIGHT = 650;

const MIN_PAGE_WIDTH = Math.floor((MIN_VIEWER_HEIGHT / IMAGE_HEIGHT) * IMAGE_WIDTH);

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div<{
  $maxHeight: number;
}>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  max-height: ${({ $maxHeight }) => addUnitIfNeeded($maxHeight)};
  overflow: hidden;
`;

type Props = {
  episodeId: string;
};

export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [viewerHeight, setViewerHeight] = useState(MIN_VIEWER_HEIGHT);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      const cqw = (ref.current.getBoundingClientRect().width ?? 0) / 100;
      const pageCountParView = 100 * cqw <= 2 * MIN_PAGE_WIDTH ? 1 : 2;
      const candidatePageWidth = (100 * cqw) / pageCountParView;
      const candidatePageHeight = (candidatePageWidth / IMAGE_WIDTH) * IMAGE_HEIGHT;
      const newViewerHeight = Math.max(MIN_VIEWER_HEIGHT, Math.min(candidatePageHeight, MAX_VIEWER_HEIGHT));

      setViewerHeight(newViewerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <_Container ref={ref}>
      <_Wrapper $maxHeight={viewerHeight}>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
