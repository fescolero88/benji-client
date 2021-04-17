import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PersonalNetworkInvite from './routes/Invite';
import PersonalNetworkView from './routes/View';
import PersonalNetworkUserView from './routes/View/NetworkUserView'

const PersonalNetworkRoutes = () => {
  let { url } = useRouteMatch();

  return (
    <div className="container mx-auto">
      <Switch>
        <Route exact path={`${url}/invite`} component={PersonalNetworkInvite}/>
        <Route exact path={`${url}/view`} component={PersonalNetworkView}/>
        <Route exact path={`${url}/users/:userId`} component={PersonalNetworkUserView}/>
      </Switch>
    </div>
  );
};

export default PersonalNetworkRoutes;
