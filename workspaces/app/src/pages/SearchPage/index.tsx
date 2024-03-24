import { Suspense, useCallback, useEffect, useState } from 'react';

import { useBookList } from '../../features/book/hooks/useBookList';
import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

const SearchPage: React.FC = () => {
  const { data: books } = useBookList({ query: {} });

  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box px={16}>
      <Input disabled={!isClient} onChange={onChangedInput} />
      <Box aria-labelledby={'searchResultsA11yId'} as="section" maxWidth="100%" py={16} width="100%">
        <Text color={Color.MONO_100} id={'searchResultsA11yId'} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {keyword !== '' && <SearchResult books={books} keyword={keyword} />}
      </Box>
    </Box>
  );
};

const SearchPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <SearchPage />
    </Suspense>
  );
};

export { SearchPageWithSuspense as SearchPage };
