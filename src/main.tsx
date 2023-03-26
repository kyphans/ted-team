import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleProvider hashPriority="high">
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </StyleProvider>,
);
