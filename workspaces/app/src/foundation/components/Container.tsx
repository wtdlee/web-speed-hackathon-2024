import React from 'react';
import styled from 'styled-components';

const _Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  background-color: #ffffff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
`;

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <_Container>{children}</_Container>;
};
