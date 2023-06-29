import { RouterProvider } from 'react-router-dom';
import { routers } from './routes';
import { NotificationProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Notification from './components/Notification';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';
import theme from './libs/antd/theme';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <Notification />
              <RouterProvider router={routers} />
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
