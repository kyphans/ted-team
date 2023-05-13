import { RouterProvider } from 'react-router-dom';
import { privateRouter } from './routes';
import { NotificationProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Notification from './components/Notification';
import { AuthProvider } from './context/AuthContext';
import './components/GlobalStyles';
import viVN from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import { ConfigProvider } from 'antd';
import theme from './libs/antd/Theme';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <ConfigProvider locale={viVN} theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <Notification />
              <RouterProvider router={privateRouter} />
              {/* Dev tool of React Query*/}
              <ReactQueryDevtools initialIsOpen={false} />
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
