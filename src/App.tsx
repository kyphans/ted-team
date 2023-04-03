import { RouterProvider } from 'react-router-dom';
import { publicRouter } from './routes';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Notification from './components/Notification';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Notification/>
          <RouterProvider router={publicRouter} />
          {/* Dev tool of React Query*/}
          <ReactQueryDevtools initialIsOpen={false} />
        </NotificationProvider>
        </QueryClientProvider>
    </div>
  );
}

export default App;
