import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Logout = () => {
  const { dispatchUserData } = useContext(UserContext);
  useEffect(() => {
    dispatchUserData({
      type: 'LOGOUT_USER',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default Logout;
