import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import UrlEnums from '../connections/UrlEnums';

const Authenticated = ({
  removeLoginData, userLogin, component: Component, ...rest
}) => {
  const { userData } = useContext(UserContext);
  const { loggedIn } = userData;
  return (
    <Route
      {...rest}
      render={props => (loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={UrlEnums.LOGIN} />
      ))}
    />
  );
};

export default Authenticated;
