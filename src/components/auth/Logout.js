import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Logout = () => {
  const { logoutUser } = useContext(UserContext);
  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default Logout;
