import { Suspense } from 'react';
import styled from 'styled-components';

import { SvgIcon } from '../../../features/icons/components/SvgIcon';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { useBook } from '../../book/hooks/useBook';

const _Wrapper = styled.li`
  width: 100%;
`;

const _Link = styled(Link)`
  width: 100%;
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  bookId: string;
};

const RankingCard: React.FC<Props> = ({ bookId }) => {
  const { data: book } = useBook({ params: { bookId } });

  return (
    <_Wrapper>
      <_Link href={`/books/${book.id}`}>
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start" pb={12} pt={12}>
          {book.image.id != null && (
            <_ImgWrapper>
              <Image alt={book.name} height={96} objectFit="cover" src={`/images/${book.image.id}.webp`} width={96} />
            </_ImgWrapper>
          )}
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Flex align="center" gap={Space * 1} justify="flex-end" pt={8}>
              {book.author.image.id != null && (
                <_AvatarWrapper>
                  <Image
                    alt={`${book.author.name}のアイコン`}
                    height={32}
                    objectFit="cover"
                    src={`/images/${book.author.image.id}.webp`}
                    width={32}
                  />
                </_AvatarWrapper>
              )}
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Flex align="center" justify="flex-end" pt={8}>
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <SvgIcon color={Color.Secondary} height={32} type="NavigateNext" width={32} />
            </Flex>
          </Box>
        </Flex>
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

const RankingCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<></>}>
      <RankingCard {...props} />
    </Suspense>
  );
};

export { RankingCardWithSuspense as RankingCard };
