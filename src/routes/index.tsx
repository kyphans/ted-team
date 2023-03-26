import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Members from '../pages/Members';

const publicRouter = createBrowserRouter([
  {
    path: '/login',
    element: <div>Login</div>,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/members',
    element: <Members />,
  },
]);

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Private Hello world!</div>,
  },
]);

export { publicRouter };
