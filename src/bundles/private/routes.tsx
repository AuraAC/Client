import React from 'react';
import {Redirect, RouteComponentProps} from '@reach/router';

import {Users} from './admin/users/Users';

import {Home} from './user/home/Home';
import {Settings} from './user/settings/Settings';
import {Support} from './user/support/Support';

const Default: React.FC<RouteComponentProps> = () => {
  return <Redirect to={'./home'} />
};

export const routes = [
	<Users key="users" path="users"/>,

  <Home key="home" path="home"/>,
  <Settings key="settings" path="settings"/>,
  <Settings key="settings" path="settings/:tabNo"/>,
  <Support key="support" path="support"/>,

  <Default key="default" path="def" />,
  <Redirect noThrow default key="default" from="/" to="/private/home" />
];
