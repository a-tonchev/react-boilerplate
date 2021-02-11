import React from 'react';
import AuthHelper from './AuthHelper';
import { useIsAdmin, useLoggedIn, useUserData } from '../users/hooks/userDataHooks';

const Authorized = ({
  children, ...rest
}) => {
  const userData = useUserData();
  const isAdmin = useIsAdmin();
  const loggedIn = useLoggedIn();

  const authorized = AuthHelper.isAuthorized({
    ...userData,
    isAdmin,
    loggedIn,
  }, rest);

  // Return component if all check passed
  return children && authorized ? <>{children}</> : <div />;
};

export default Authorized;
