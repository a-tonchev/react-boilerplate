import { Navigate } from 'react-router-dom';

import { useLoggedIn, useRedirected } from '@/screens/users/hooks/userDataHooks';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const Public = ({
  element,
}) => {
  const loggedIn = useLoggedIn();
  const redirectedFrom = useRedirected();

  return !loggedIn ? element : (
    <Navigate to={redirectedFrom || UrlEnums.MAIN} />
  );
};

export default Public;
