import { StyleProvider } from '@ant-design/cssinjs';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--window-height', `${window.innerHeight}px`);
  doc.style.setProperty('--window-width', `${window.innerWidth}px`);
};
window.addEventListener('resize', documentHeight);
documentHeight();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleProvider hashPriority="high">
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </StyleProvider>,
);
