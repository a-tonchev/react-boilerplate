import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UrlEnums from '../connections/enums/UrlEnums';
import { useLoggedIn, useRedirected } from '../../screens/users/hooks/userDataHooks';

const Public = ({
  component: Component, ...rest
}) => {
  const loggedIn = useLoggedIn();
  const redirectedFrom = useRedirected();

  return (
    <Route
      {...rest}
      render={props => (!loggedIn ? (
        <Component {...props} loggedIn={loggedIn} />
      ) : (
        <Redirect to={redirectedFrom || UrlEnums.MAIN} />
      ))}
    />
  );
};

export default Public;
