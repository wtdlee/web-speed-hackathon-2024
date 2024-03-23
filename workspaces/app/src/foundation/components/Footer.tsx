import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { COMPANY } from '../constants/Company';
import { CONTACT } from '../constants/Contact';
import { OVERVIEW } from '../constants/Overview';
import { QUESTION } from '../constants/Question';
import { TERM } from '../constants/Term';
import { Color, Typography } from '../styles/variables';

import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Footer = styled.footer`
  max-width: 1024px;
  margin: 0 auto;
  background-color: ${Color.Background};
  padding: 8px;
`;

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToDialogOpen = (contentType: keyof typeof dialogContents) => () => {
    updateDialogContent(dialogContents[contentType]);
  };

  const dialogContents = {
    company: (
      <_Content aria-labelledby={useId()} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={useId()} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={8} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {COMPANY}
        </Text>
      </_Content>
    ),
    contact: (
      <_Content aria-labelledby={useId()} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={useId()} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={8} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {CONTACT}
        </Text>
      </_Content>
    ),
    question: (
      <_Content aria-labelledby={useId()} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={useId()} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={8} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {QUESTION}
        </Text>
      </_Content>
    ),
    request: (
      <_Content aria-labelledby={useId()} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={useId()} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={8} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {OVERVIEW}
        </Text>
      </_Content>
    ),
    term: (
      <_Content aria-labelledby={useId()} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={useId()} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={8} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {TERM}
        </Text>
      </_Content>
    ),
  };

  return (
    <_Footer>
      <Flex align="flex-start" direction="column" gap={8} justify="flex-start">
        <img
          alt="Cyber TOON"
          height={'auto'}
          loading="lazy"
          src="/assets/cyber-toon.webp"
          style={{ aspectRatio: '16 / 9', display: 'block', margin: '0 auto', maxWidth: '1024px' }}
          width={'100%'}
        />
        <Flex align="start" direction="row" gap={8.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToDialogOpen('term')}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToDialogOpen('request')}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToDialogOpen('question')}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToDialogOpen('company')}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToDialogOpen('contact')}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </_Footer>
  );
};
