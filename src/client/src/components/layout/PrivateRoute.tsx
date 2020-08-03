import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../core/auth/authSelector';
export const PrivateRoute = (props:any) => {
  const { component: Component, ...rest } = props;
  const {user} = useSelector(selectUser)
  return <Route {...rest} render={(props:any) => (
    user ? <Component {...rest} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
}