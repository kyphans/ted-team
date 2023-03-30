import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Members from '../pages/Members';

const publicRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'members', element: <Members /> },
    ],
  },
]);

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Private Hello world!</div>,
  },
]);

export { publicRouter };
