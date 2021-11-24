import { Navigate, useLocation } from 'react-router-dom';

import { useLoggedIn } from '@/screens/users/hooks/userDataHooks';

import UrlEnums from '../connections/enums/UrlEnums';

const Authenticated = ({
  element,
}) => {
  const loggedIn = useLoggedIn();
  const location = useLocation();

  return loggedIn ? element : (
    <Navigate
      to={UrlEnums.LOGIN}
      state={{
        redirectFrom:
          location.pathname + location.search,
      }}
    />
  );
};

export default Authenticated;
