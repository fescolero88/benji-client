import React, {lazy, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import { setCompany } from '@iso/redux/producerJob/actions';
import { setWorkspaceCompany } from '@iso/redux/accountBoard/actions';

export const routes = [
  {
    path: 'jobs',
    component: lazy(() => import('@iso/containers/Company/Jobs')),
  },
  {
    path: 'network',
    component: lazy(() => import('@iso/containers/Company/Network')),
  },
  {
    path: 'profile',
    component: lazy(() => import('@iso/containers/Company/Profile')),
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

const CompanyRoutes = () => {
  const dispatch = useDispatch();
  const { url, params: { companyId } } = useRouteMatch();

  useEffect(() => {
    dispatch(setCompany(companyId));
    dispatch(setWorkspaceCompany(companyId));
  }, [companyId]);

  return (
    <Switch>
      {routes.map((route, idx) => (
        <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
          <route.component />
        </Route>
      ))}
    </Switch>
  )
};

export default CompanyRoutes;