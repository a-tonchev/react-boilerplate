import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UrlEnums from '../connections/enums/UrlEnums';
import { useLoggedIn } from '../../components/users/hooks/userDataHooks';

const Authenticated = ({
  removeLoginData, userLogin, component: Component, ...rest
}) => {
  const loggedIn = useLoggedIn();

  return (
    <Route
      {...rest}
      render={props => (loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: UrlEnums.LOGIN,
          state: {
            redirectFrom:
              rest.location.pathname + rest.location.search,
          },
        }}
        />
      ))}
    />
  );
};

export default Authenticated;
