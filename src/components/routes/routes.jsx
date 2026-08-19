import { lazy } from 'react';
import {
  Navigate,
} from 'react-router-dom';

import UrlEnums from '@/components/connections/enums/UrlEnums';

const Login = lazy(() => import('@/screens/auth/Login'));
const SignUp = lazy(() => import('@/screens/auth/SignUp'));
const Logout = lazy(() => import('@/screens/auth/Logout'));
const NotFoundPage = lazy(() => import('@/screens/NotFoundPage'));
const Home = lazy(() => import('@/screens/Home'));
const Profile = lazy(() => import('@/screens/users/Profile'));
const ForgotPassword = lazy(() => import('@/screens/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('@/screens/auth/ResetPassword'));
const Verify = lazy(() => import('@/screens/auth/Verify'));
const Showcase = lazy(() => import('@/screens/hacktoberfest/Showcase'));

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
  { path: UrlEnums.VERIFY, element: <Verify />, type: 'public' },
  { path: UrlEnums.SHOWCASE, element: <Showcase /> },
  { path: UrlEnums.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <Navigate to={UrlEnums.NOT_FOUND} replace /> },
];

export default routes;
