import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect} from 'react-router';
import { Layout } from 'antd';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import ProducerDashboard from './Producer';
import ContractorDashboard from './Contractor';
import EmptyComponent from '@iso/components/EmptyComponent';
import { isContractor, isExecutiveUser } from '@iso/lib/helpers/auth';
import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles';
import { syncAuthUserRequest } from '@iso/redux/auth/actions';
import {
  fetchAccountJobsRequest, fetchAccountCallsheetsRequest, fetchAccountNetworkInvitationsRequest
} from '@iso/redux/accountBoard/actions';

const { toggleAll } = appActions;

const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '88px 0 0',
    flexShrink: '0',
    // background: 'white',
    background:'#f5f7fa',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

const AuthUserDashboard = () => {
  const dispatch = useDispatch();



  const { user: authUser } = useSelector(state => state.Auth);
  const appHeight = useSelector(state => state.App.height);

  useEffect(() => {
    if (authUser.lastLogin) {
      dispatch(syncAuthUserRequest())
    }
  }, [dispatch]);

  useEffect(() => {
    // Subscribe Person/Pending, Callsheet, Network
    dispatch(fetchAccountJobsRequest(authUser.id, 'PENDING'));
    dispatch(fetchAccountCallsheetsRequest(authUser.id, {status: 'PENDING'}));
    dispatch(fetchAccountNetworkInvitationsRequest(authUser.id, {status: 'Pending'}));
    };
    refresh();
    const interval = setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', refresh); };
  }, [dispatch, authUser && authUser.id]);

  if (!authUser) return <Redirect to="/login" />;

  if (!authUser.profileCompleted) {
    return <Redirect to="/account-wizard" />
  }

  if (isExecutiveUser(authUser)) {
    return <ProducerDashboard height={appHeight} styles={styles} className="producerLayout" />
  }

  if (isContractor(authUser)) {
    return <ContractorDashboard height={appHeight} styles={styles} className="contractorLayout" />
  }

  return (
    <EmptyComponent text="No pages matches with account type" />
  );
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <AuthUserDashboard />
      </Layout>
    </DashboardContainer>
  );
}
