import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import CompanyOwner from '../CompanyOwner';
import CompanyProfile from '../CompanyProfile';
import CompanyLogoUpload from '../CompanyLogoUpload';
import PersonalProfile from '../PersonalProfile';
import PersonalPhotoUpload from '../PersonalPhotoUpload';
import AccountTypes from '@iso/enums/account_types';
import { nextWizardStep, completeWizardRequest } from '@iso/redux/accountWizard/actions';

const CompanyAccountWizard = ({step}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user: authUser } = useSelector(state => state.Auth);

  const handleStepSuccess = () => {
    if (step === 5) {
      dispatch(completeWizardRequest(authUser.id, AccountTypes.COMPANY));
      history.push('/account/company/success');
    } else {
      dispatch(nextWizardStep());
    }
  };

  const handleStepSkip = () => {
    if (step === 5) {
      dispatch(completeWizardRequest(authUser.id, AccountTypes.COMPANY));
      history.push('/account/company/success');
    } else {
      dispatch(nextWizardStep());
    }
  };

  if (step === 1) {
    return <CompanyOwner onSuccess={handleStepSuccess} />;
  }

  if (step === 2) {
    return (
      <CompanyProfile
        title="Company Account Information"
        subTitle="Fill Out Form"
        onSuccess={handleStepSuccess}
      />
    )
  }

  if (step === 3) {
    return (
      <CompanyLogoUpload
        title="Create your Company Account"
        subTitle="Upload Company Logo"
        onSuccess={handleStepSuccess}
      />
    )
  }

  if (step === 4) {
    return (
      <PersonalProfile
        title="Setup Your Personal Profile"
        subTitle="Fill Out Form"
        onSuccess={handleStepSuccess}
        onSkip={handleStepSkip}
      />
    )
  }

  if (step === 5) {
    return (
      <PersonalPhotoUpload
        title="Upload Your Profile Picture"
        subTitle="Upload Profile Photo"
        onSuccess={handleStepSuccess}
        onSkip={handleStepSkip}
      />
    )
  }
};

export default CompanyAccountWizard;
