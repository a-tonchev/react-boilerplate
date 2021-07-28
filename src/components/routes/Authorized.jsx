import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthHelper from '@/screens/auth/AuthHelper';
import { useIsAdmin, useLoggedIn, useUserData } from '@/screens/users/hooks/userDataHooks';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const Authorized = ({
  component: Component,
  ...rest
}) => {
  const userData = useUserData();
  const isAdmin = useIsAdmin();
  const loggedIn = useLoggedIn();
  const authorized = AuthHelper.isAuthorized({ ...userData, isAdmin, loggedIn }, rest);
  return (
    <Route
      {...rest}
      render={props => (authorized ? (
        <Component {...props} />
      ) : (
        <Redirect to={UrlEnums.LOGIN} />
      ))}
    />
  );
};

export default Authorized;
