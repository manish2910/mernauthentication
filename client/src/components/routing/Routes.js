import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import User from '../user/user';
import PrivateRoute from './PrivateRoutes';

const Routes = () => {

  const allRoutes = () => (
    <section className="main_container">
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/user" component={User} />
      </Switch>
    </section>
  )
  
  return allRoutes();
};

export default Routes;
