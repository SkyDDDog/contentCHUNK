import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
/* 添加注释 */
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Import the Saas UI theme
import { SaasProvider, theme as baseTheme } from '@saas-ui/react';

// 3. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors }, baseTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SaasProvider theme={theme}>
    <App />
  </SaasProvider>,
);
