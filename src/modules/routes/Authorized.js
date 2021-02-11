import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UrlEnums from '../connections/enums/UrlEnums';
import AuthHelper from '../../components/auth/AuthHelper';
import { useIsAdmin, useLoggedIn, useUserData } from '../../components/users/hooks/userDataHooks';

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
