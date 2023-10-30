import { Navigate, type RouteObject } from 'react-router-dom';
import { Root } from '@pages/root/Root';

export const routesConfig: RouteObject[] = [
  {
    index: true,
    Component: Root,
  },
  {
    path: '*',
    Component: () => {
      return <Navigate to="/" />;
    },
  },
];
