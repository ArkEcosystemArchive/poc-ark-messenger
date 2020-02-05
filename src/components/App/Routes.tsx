import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import Channels from '../Channels';
import Chat from '../Chat';

import { LoginContext } from '../../contexts';

type IProps = {
  component: any;
  exact?: boolean;
  path: string;
};

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  const context = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={props => (context.user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create-account" component={CreateAccount} />
      <PrivateRoute exact path="/chat" component={Chat} />
      <PrivateRoute path="/chat/:id" component={Chat} />
      <PrivateRoute exact path="/channels" component={Channels} />
    </Switch>
  );
}
