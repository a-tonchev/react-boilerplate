import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UrlEnums from '../connections/enums/UrlEnums';
import Home from '../../screens/Home';
import Public from './Public';
import Login from '../../screens/auth/Login';
import NotFoundPage from '../../screens/NotFoundPage';
import Logout from '../../screens/auth/Logout';
import SignUp from '../../screens/auth/SignUp';
import Authenticated from './Authenticated';

const MainRoutes = () => (
  <Switch>
    <Authenticated exact path={UrlEnums.MAIN} component={Home} />
    <Public exact path={UrlEnums.LOGIN} component={Login} />
    <Public exact path={UrlEnums.SIGN_UP} component={SignUp} />
    <Authenticated exact path={UrlEnums.LOGOUT} component={Logout} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default MainRoutes;
