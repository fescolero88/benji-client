import React from 'react';
import {useSelector} from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';
import ContractorJobDetailsHeader from '../JobDetails/Header';
import PendingJobDetails from './Details';

const PendingJobRoutes = () => {
  const { url } = useRouteMatch();
  const { job } = useSelector(state => state.ContractorJob);

  return (
    <>
      <ContractorJobDetailsHeader job={job} />
      <Switch>
        <Route
          path={`${url}/`}
          component={PendingJobDetails}
        />

        <Redirect to={`${url}/`} />
      </Switch>
    </>
  );
};

export default PendingJobRoutes;
