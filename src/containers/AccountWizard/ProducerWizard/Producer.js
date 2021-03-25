import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import PersonalProfile from '../PersonalProfile';
import PersonalPhotoUpload from '../PersonalPhotoUpload';
import AccountTypes from '@iso/enums/account_types';
import { nextWizardStep, completeWizardRequest } from '@iso/redux/accountWizard/actions';

const ProducerAccountWizard = ({step}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user: authUser } = useSelector(state => state.Auth);

  const handleStepSuccess = () => {
    if (step === 2) {
      dispatch(completeWizardRequest(authUser.id, AccountTypes.PRODUCER));
      history.push('/account/producer/success');
    } else {
      dispatch(nextWizardStep());
    }
  };

  if (step === 1) {
    return (
      <PersonalProfile
        title="Setup Your Personal Profile"
        subTitle="Fill Out Form"
        onSuccess={handleStepSuccess}
      />
    )
  }

  if (step === 2) {
    return (
      <PersonalPhotoUpload
        title="Upload Your Profile Picture"
        subTitle="Upload Profile Photo"
        onSuccess={handleStepSuccess}
      />
    )
  }
};

export default ProducerAccountWizard;
