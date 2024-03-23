import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Color } from './variables';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${Color.MONO_A};
    font-display: swap;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
  }
`;
