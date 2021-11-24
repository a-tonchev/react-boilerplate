import { Navigate } from 'react-router-dom';

import AuthHelper from '@/screens/auth/AuthHelper';
import { useIsAdmin, useLoggedIn, useUserData } from '@/screens/users/hooks/userDataHooks';

import UrlEnums from '../connections/enums/UrlEnums';

const Authorized = ({
  element,
  authProps,
}) => {
  const userData = useUserData();
  const isAdmin = useIsAdmin();
  const loggedIn = useLoggedIn();

  const authorized = AuthHelper.isAuthorized({ ...userData, isAdmin, loggedIn }, authProps);
  return authorized ? element : (
    <Navigate
      to={UrlEnums.LOGIN}
      state={{
        redirectFrom:
          location.pathname + location.search,
      }}
    />
  );
};

export default Authorized;
