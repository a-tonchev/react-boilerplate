import { Navigate } from 'react-router-dom';

import UrlEnums from '@/components/connections/enums/UrlEnums';

// Deliberately inert: this URL used to execute the logout on mount, which made
// every /logout history entry a session killer on back-navigation. The real
// logout lives in performLogout(), triggered directly from the menus.
const Logout = () => <Navigate to={UrlEnums.MAIN} replace />;

export default Logout;
