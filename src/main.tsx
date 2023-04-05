import { StyleProvider } from '@ant-design/cssinjs';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleProvider hashPriority="high">
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </StyleProvider>,
);
