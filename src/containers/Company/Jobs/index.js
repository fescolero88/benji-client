import React from 'react';
import {Switch, Route, useRouteMatch } from 'react-router-dom';
import CompanyJobBoard from './JobBoard';
import CompanyJobDetails from './routes/JobDetails';

const JobsRoutes = () => {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${url}/`} component={CompanyJobBoard} />
      <Route path={`${url}/:jobId`} component={CompanyJobDetails} />
    </Switch>
  );
};

export default JobsRoutes;
