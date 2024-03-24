import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { Link } from '../../../foundation/components/Link';

import { FavButton } from './FavButton';

const _Wrapper = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s ease-out;
`;

const _Content = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  min-width: 296px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 32px;
  background-color: #ffffff;
`;

const _ReadLink = styled(Link)`
  display: block;
  border-radius: 24px;
  background-color: #fadb5f;
  padding: 16px 64px;
  font-weight: bold;
  color: #202020;
  flex-shrink: 0;
`;

type Props = {
  bookId: string;
  isFavorite: boolean;
  latestEpisodeId: string;
  onClickFav: () => void;
};

export const BottomNavigator: React.FC<Props> = ({ bookId, isFavorite, latestEpisodeId, onClickFav }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFavClick = useCallback(() => {
    onClickFav();
  }, [onClickFav]);

  return (
    <_Wrapper style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}>
      <_Content>
        <FavButton enabled={isFavorite} onClick={handleFavClick} />
        <_ReadLink to={`/books/${bookId}/episodes/${latestEpisodeId}`}>最新話を読む</_ReadLink>
      </_Content>
    </_Wrapper>
  );
};
