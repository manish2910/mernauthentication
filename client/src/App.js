import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Landing from './components/shared/Landing';
import Routes from './components/routing/Routes';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './action/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
