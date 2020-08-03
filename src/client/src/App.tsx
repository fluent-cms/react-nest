import React from 'react';
import { Layout } from './components/layout/Layout';
import { Route } from 'react-router-dom';
import Dashboard from './containers/dashboard/Dashboard';
import { Login } from './containers/login/login';
import { PrivateRoute } from './components/layout/PrivateRoute';
import { ModelList } from './containers/model/ModelList';
import { UserDisplayOption } from './viewModels/UserDisplay';
import { ClientDisplayOption } from './viewModels/ClientDisplay';
import Profile from 'containers/profile/Profile';

export default function App() {
  return (
    <Layout>
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/' component={Dashboard} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/clients' component={ModelList} display={ClientDisplayOption} />
      <PrivateRoute exact path='/users' component={ModelList} display={UserDisplayOption} />
      <PrivateRoute exact path='/profile' component={Profile} />
    </Layout>
  );
}