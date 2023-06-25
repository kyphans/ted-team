import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Login from '../pages/Login';
import TestComponent from '../pages/TestComponent';
import Home from '../pages/Home';
import Members from '../pages/Members';
import Collaborators from '../pages/Collaborators';
import { ProtectedRoute } from './ProtectedRoute';
import OrgChart from '../pages/OrgChart';

const privateRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'test', element: <TestComponent /> },
      { path: 'home', element: <Home /> },
      { path: 'members', element: <Members /> },
      { path: 'collaborators', element: <Collaborators /> },
      { path: 'orgchart', element: <OrgChart /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const privateRouter1 = createBrowserRouter([
  {
    path: '/',
    element: <div>Private Hello world!</div>,
  },
]);

export { privateRouter };
