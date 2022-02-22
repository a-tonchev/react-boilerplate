import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import Authorized from '@/components/routes/Authorized';

import routesBase from './routes';
import Authenticated from './Authenticated';
import Public from './Public';

const normalizeRoutes = routes => routes.map(
  route => {
    const {
      path, type, element, authProps,
    } = route;

    switch (type) {
      case 'public': {
        return {
          path,
          element: <Public element={element} />,
        };
      }
      case 'authenticated': {
        return {
          path,
          element: <Authenticated element={element} />,
        };
      }
      case 'authorized': {
        return {
          path,
          element: <Authorized path={path} element={element} authProps={authProps} />,
        };
      }
      default: {
        return {
          path,
          element,
        };
      }
    }
  },
);

const MainRoutes = () => {
  const normalizedRoutes = useMemo(() => normalizeRoutes(routesBase), []);

  return useRoutes(normalizedRoutes);
};

export default MainRoutes;
