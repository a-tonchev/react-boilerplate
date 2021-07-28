import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Logout from '@/screens/auth/Logout';
import Home from '@/screens/Home';
import Login from '@/screens/auth/Login';
import NotFoundPage from '@/screens/NotFoundPage';
import SignUp from '@/screens/auth/SignUp';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import ForgotPassword from '@/screens/auth/ForgetPassword';

import Public from './Public';
import Authenticated from './Authenticated';

const MainRoutes = () => (
  <Switch>
    <Authenticated exact path={UrlEnums.MAIN} component={Home} />
    <Public exact path={UrlEnums.LOGIN} component={Login} />
    <Public exact path={UrlEnums.SIGN_UP} component={SignUp} />
    <Public exact path={UrlEnums.PASSWORD_FORGET} component={ForgotPassword} />
    <Authenticated exact path={UrlEnums.LOGOUT} component={Logout} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default MainRoutes;
