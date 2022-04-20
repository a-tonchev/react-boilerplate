import {
  Navigate,
} from 'react-router-dom';

import UrlEnums from '@/components/connections/enums/UrlEnums';
import Login from '@/screens/auth/Login';
import SignUp from '@/screens/auth/SignUp';
import Logout from '@/screens/auth/Logout';
import NotFoundPage from '@/screens/NotFoundPage';
import Home from '@/screens/Home';
import Profile from '@/screens/users/Profile';
import ForgotPassword from '@/screens/auth/ForgetPassword';
import ResetPassword from '@/screens/auth/ResetPassword';
import Showcase from '@/screens/hacktoberfest/Showcase';
import TestShowcase from '@/screens/test/Showcase';

const routes = [
  {
    path: UrlEnums.MAIN,
    element: <Home />,
    type: 'authenticated',
  },
  { path: UrlEnums.PROFILE, element: <Profile />, type: 'authenticated' },
  { path: UrlEnums.LOGOUT, element: <Logout />, type: 'authenticated' },
  { path: UrlEnums.LOGIN, element: <Login />, type: 'public' },
  { path: UrlEnums.SIGN_UP, element: <SignUp />, type: 'public' },
  { path: UrlEnums.PASSWORD_FORGET, element: <ForgotPassword />, type: 'public' },
  { path: UrlEnums.PASSWORD_RESET, element: <ResetPassword />, type: 'public' },
  { path: UrlEnums.SHOWCASE, element: <Showcase /> },
  { path: UrlEnums.TEST, element: <TestShowcase />, type: 'public' },
  { path: UrlEnums.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <Navigate to={UrlEnums.NOT_FOUND} replace /> },
];

export default routes;
