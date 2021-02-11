import React, { useEffect } from 'react';
import Connections, { ApiEndpoints } from '../../modules/connections/Connections';
import tokenStore from '../../modules/connections/stores/tokenStore';
import { useLogoutUser } from '../users/hooks/userDataHooks';

const Logout = () => {
  const logout = useLogoutUser();

  useEffect(() => {
    const logoutUser = async () => {
      await Connections.postRequest(ApiEndpoints.logout);
    };
    logoutUser().then(() => {
      tokenStore.remove();
    });
    logout(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
};

export default Logout;
