import React from 'react';
import {useSelector} from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import JobPageMenu from '../JobDetails/PageMenu';
import InBidJobCrew from './Crew';
import JobHeader from './JobHeader';
import BookCrewModals from '@iso/containers/Modal/BookCrew';

const INBID_JOB_MENUS = [
  {
    name: 'Crew',
    path: 'crew',
    pattern: '/companies/:companyId/jobs/:jobId/crew',
    component: InBidJobCrew
  },
  // {
  //   name: 'Schedule / Callsheet',
  //   path: 'schedule',
  //   pattern: '/companies/:companyId/jobs/:jobId/schedule',
  //   component: null
  // },
  // {
  //   name: 'Location',
  //   path: 'location',
  //   pattern: '/companies/:companyId/jobs/:jobId/location',
  //   component: null
  // },
  // {
  //   name: 'Job Documents',
  //   path: 'documents',
  //   pattern: '/companies/:companyId/jobs/:jobId/documents',
  //   component: null
  // },
  // {
  //   name: 'Pre-Production Book',
  //   path: 'pre-production',
  //   pattern: '/companies/:companyId/jobs/:jobId/pre-production',
  //   component: null
  // }
];

const InBidJobRoutes = () => {
  const { url } = useRouteMatch();
  const { job } = useSelector(state => state.ProducerJob);

  return (
    <>
      <JobHeader job={job} />
      {/*<JobPageMenu menus={INBID_JOB_MENUS} color="#ffc06a" />*/}
      <BookCrewModals />
      <Switch>
        {INBID_JOB_MENUS.map((menu, index) => (
          <Route
            path={`${url}/${menu.path}`}
            component={menu.component}
            key={`inbid-job-routes_${index}`}
          />
        ))}
        <Redirect to={`${url}/crew`} />
      </Switch>
    </>
  );
};

export default InBidJobRoutes;
