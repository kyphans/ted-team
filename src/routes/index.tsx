import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Login from '../pages/Login';
import TestComponent from '../pages/TestComponent';
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
      { path: 'test', element: <TestComponent /> },
      { path: 'home', element: <Home /> },
      { path: 'members', element: <Members /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Private Hello world!</div>,
  },
]);

export { publicRouter };
