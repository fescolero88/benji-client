import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router';
import CompanyAccountSuccess from './CompanyWizard/Success';
import ProducerAccountSuccess from './ProducerWizard/Success';
import CrewAccountSuccess from './CrewWizard/Success';
import AccountTypes from '@iso/enums/account_types';
import notify from '@iso/lib/helpers/notify';
import { syncAuthUserRequest } from '@iso/redux/auth/actions';
import { showServerError } from '@iso/lib/helpers/utility';

export default function () {
  const dispatch = useDispatch();
  const { syncUser } = useSelector(state => state.Auth);
  const history = useHistory();
  const { accountType } = useParams();
  const [action, setAction] = useState('');

  useEffect(() => {
    if (!syncUser.loading && !syncUser.error && action === 'sync') {
      history.push('/dashboard');
    }

    if (syncUser.error && action === 'sync') {
      notify('error', showServerError(syncUser.error));
    }

    if (!syncUser.loading && action === 'sync') {
      setAction('');
    }
  }, [syncUser]);

  const handleSkipAndDashboard = () => {
    setAction('sync');
    dispatch(syncAuthUserRequest());

  };

  if (accountType === AccountTypes.COMPANY.toLowerCase()) {
    return <CompanyAccountSuccess onSkip={handleSkipAndDashboard} />
  }

  if (accountType === AccountTypes.PRODUCER.toLowerCase()) {
    return <ProducerAccountSuccess onSkip={handleSkipAndDashboard} />
  }

  if (accountType === AccountTypes.CREW.toLowerCase()) {
    return <CrewAccountSuccess onSkip={handleSkipAndDashboard} />
  }
}
