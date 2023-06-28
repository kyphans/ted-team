import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Login from '../pages/Login';
import TestComponent from '../pages/TestComponent';
import Home from '../pages/Home';
import Members from '../pages/Members';
import Collaborators from '../pages/Collaborators';
import { ProtectedRoute } from './ProtectedRoute';
import Setting from '../pages/Setting';
import OrgChart from '../pages/OrgChart';
import URLShortener from '../pages/URLShortener';

const privateRouter = [
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
      { path: 'setting', element: <Setting /> },
      { path: 'orgchart', element: <OrgChart /> },
      { path: 'url-shortener', element: <URLShortener /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

const publicRouter = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/link',
    element: <div>Private Hello world!</div>,
  },
];

const routers = createBrowserRouter([...privateRouter, ...publicRouter]);
export { routers };
