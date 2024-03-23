import { useSetAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Typography } from '../styles/variables';

import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Footer = styled.footer`
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

  const handleRequestToDialogOpen = (contentType: keyof typeof dialogContents) => async () => {
    const contentComponent = await dialogContents[contentType]();
    updateDialogContent(contentComponent);
  };

  const dialogContents = {
    company: async () => {
      const response = await fetch('/assets/Company.json');
      const { text } = await response.json();

      return (
        <_Content aria-labelledby={'company'} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={'company'} typography={Typography.NORMAL16}>
            運営会社
          </Text>
          <Spacer height={8} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {text || 'Loading...'}
          </Text>
        </_Content>
      );
    },
    contact: async () => {
      const response = await fetch('/assets/Contact.json');
      const { text } = await response.json();

      return (
        <_Content aria-labelledby={'contact'} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={'contact'} typography={Typography.NORMAL16}>
            お問い合わせ
          </Text>
          <Spacer height={8} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {text || 'Loading...'}
          </Text>
        </_Content>
      );
    },
    question: async () => {
      const response = await fetch('/assets/Question.json');
      const { text } = await response.json();

      return (
        <_Content aria-labelledby={'question'} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={'question'} typography={Typography.NORMAL16}>
            Q&A
          </Text>
          <Spacer height={8} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {text || 'Loading...'}
          </Text>
        </_Content>
      );
    },
    request: async () => {
      const response = await fetch('/assets/Overview.json');
      const { text } = await response.json();

      return (
        <_Content aria-labelledby={'request'} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={'request'} typography={Typography.NORMAL16}>
            Cyber TOONとは
          </Text>
          <Spacer height={8} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {text || 'Loading...'}
          </Text>
        </_Content>
      );
    },
    term: async () => {
      const response = await fetch('/assets/Term.json');
      const { text } = await response.json();

      return (
        <_Content aria-labelledby={'term'} role="dialog">
          <Text as="h2" color={Color.MONO_100} id={'term'} typography={Typography.NORMAL16}>
            利用規約
          </Text>
          <Spacer height={8} />
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
            {text || 'Loading...'}
          </Text>
        </_Content>
      );
    },
  };

  return (
    <_Footer>
      <Flex align="flex-start" direction="column" gap={8} justify="flex-start">
        <img alt="Cyber TOON" loading="lazy" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={12} justify="center">
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
