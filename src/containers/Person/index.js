import React, {lazy} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

export const routes = [
  {
    path: 'jobs',
    component: lazy(() => import('@iso/containers/Person/Jobs')),
  },
  {
    path: 'schedule',
    component: lazy(() => import('@iso/containers/Person/Schedule')),
  },
  {
    path: 'network',
    component: lazy(() => import('@iso/containers/Person/Network')),
  },
  {
    path: 'finance',
    component: lazy(() => import('@iso/containers/Person/Finance')),
  },
  {
    path: 'profile',
    component: lazy(() => import('@iso/containers/Person/Profile')),
  },
  {
    path: 'notifications',
    component: lazy(() => import('@iso/containers/Notification')),
  },
  {
    path: 'messages',
    component: lazy(() => import('@iso/containers/Messages')),
  }
];

const PersonRoutes = () => {
  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route exact={route.exact} key={idx} path={`/${route.path}`}>
          <route.component/>
        </Route>
      ))}
    </Switch>
  )
};

export default PersonRoutes;