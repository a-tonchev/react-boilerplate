import { useEffect } from 'react';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import tokenStore from '@/components/connections/stores/tokenStore';
import { logoutUser } from '@/screens/users/stores/userStore';

const Logout = () => {
  useEffect(() => {
    const doLogout = async () => {
      await Connections.postRequest(ApiEndpoints.logout);
      tokenStore.remove();
      await logoutUser();
    };
    doLogout();
  }, []);

  return <div />;
};

export default Logout;
