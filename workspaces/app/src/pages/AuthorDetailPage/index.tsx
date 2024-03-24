import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';

import { useAuthor } from '../../features/author/hooks/useAuthor';
import { BookListItem } from '../../features/book/components/BookListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Separator } from '../../foundation/components/Separator';
import { Text } from '../../foundation/components/Text';
import { useImage } from '../../foundation/hooks/useImage';
import { Color, Typography } from '../../foundation/styles/variables';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${16}px;
  gap: ${16}px;
`;

const _AuthorImageWrapper = styled.div`
  width: 128px;
  height: 128px;
  > img {
    border-radius: 50%;
  }
`;

const AuthorDetailPage: React.FC = () => {
  const { authorId: id } = useParams<RouteParams<'/authors/:authorId'>>();
  const authorId = id ?? '';

  const { data: author } = useAuthor({ params: { authorId } });

  const imageUrl = useImage({ height: 128, imageId: author.image.id, width: 128 });

  return (
    <Box height="100%" px={16}>
      <_HeadingWrapper aria-label="作者情報">
        {imageUrl != null && (
          <_AuthorImageWrapper>
            <Image key={author.id} alt={author.name} height={128} objectFit="cover" src={imageUrl} width={128} />
          </_AuthorImageWrapper>
        )}

        <Flex align="flex-start" direction="column" gap={8} justify="flex-start">
          <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
            {author.name}
          </Text>
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
            {author.description}
          </Text>
        </Flex>
      </_HeadingWrapper>

      <Separator />

      <Box aria-labelledby={'bookListA11yId'} as="section" maxWidth="100%" py={16} width="100%">
        <Text as="h2" color={Color.MONO_100} id={'bookListA11yId'} typography={Typography.NORMAL20} weight="bold">
          作品一覧
        </Text>

        <Flex align="center" as="ul" direction="column" justify="center" pt={16}>
          {author.books.map((book) => (
            <BookListItem key={book.id} bookId={book.id} />
          ))}
          {author.books.length === 0 && (
            <>
              <div style={{ height: 16 }} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作者の作品はありません
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const AuthorDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <AuthorDetailPage />
    </Suspense>
  );
};

export { AuthorDetailPageWithSuspense as AuthorDetailPage };
