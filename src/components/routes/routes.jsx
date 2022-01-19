import {
  Navigate,
} from 'react-router-dom';

import UrlEnums from '@/components/connections/enums/UrlEnums';
import Home from '@/screens/Home';
import Login from '@/screens/auth/Login';
import SignUp from '@/screens/auth/SignUp';
import ForgetPassword from '@/screens/auth/ForgetPassword';
import Showcase from '@/screens/hacktoberfest/Showcase';
import Logout from '@/screens/auth/Logout';
import NotFoundPage from '@/screens/NotFoundPage';
import Dnd from '@/screens/dnd/Dnd';
import Craft from '@/screens/craft/Craft';
import SmoothDnd, { SimpleSmooth } from '@/screens/smooth-dnd/SmoothDnd';

const routes = [
  { path: UrlEnums.MAIN, element: <Home /> },
  { path: UrlEnums.SHOWCASE, element: <Showcase /> },
  { path: UrlEnums.LOGIN, element: <Login />, type: 'public' },
  { path: UrlEnums.SIGN_UP, element: <SignUp />, type: 'public' },
  { path: UrlEnums.DND, element: <Dnd /> },
  { path: UrlEnums.CRAFT, element: <Craft /> },
  { path: UrlEnums.SMOOTH_DND, element: <SimpleSmooth /> },
  { path: UrlEnums.PASSWORD_FORGET, element: <ForgetPassword /> },
  { path: UrlEnums.LOGOUT, element: <Logout />, type: 'authenticated' },
  { path: UrlEnums.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <Navigate to={UrlEnums.NOT_FOUND} replace /> },
];

export default routes;
