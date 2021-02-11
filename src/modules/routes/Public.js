import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UrlEnums from '../connections/UrlEnums';
import { UserContext } from '../../contexts/UserContext';

const Public = ({
  component: Component, ...rest
}) => {
  const { userData } = useContext(UserContext);
  const { loggedIn } = userData;

  return (
    <Route
      {...rest}
      render={props => (!loggedIn ? (
        <Component {...props} loggedIn={loggedIn} />
      ) : (
        <Redirect to={UrlEnums.MAIN} />
      ))}
    />
  );
};

export default Public;
