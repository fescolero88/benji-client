import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router';
import AccountWizardStyleWrapper from './AccountWizard.styles';
import { Steps } from 'antd';
import Button from '@iso/components/uielements/button';
import Icon from '@iso/components/icons/Icon';
import ChooseAccount from './ChooseAccount';
import CompanyAccountWizard from './CompanyWizard';
import ProducerAccountWizard from './ProducerWizard';
import CrewAccountWizard from './CrewWizard';
import AccountTypes from '@iso/enums/account_types';
import Logo from '@iso/assets/images/logo-black.svg';
import StepNext from "@iso/assets/images/step-next.svg";
import StepBack from "@iso/assets/images/step-back.svg";
import {
  setWizardAccountType, nextWizardStep, prevWizardStep,
  setWizardStep, setCompletedLastWizardStep
} from '@iso/redux/accountWizard/actions';

const { Step } = Steps;

const AccountWizard = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { accountType: wizardAccountType, step, completedLastStep } = useSelector(state => state.AccountWizard);
  const [accountType, setAccountType] = useState(AccountTypes.COMPANY);
  const [steps, setSteps] = useState([
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' },
    { title: 'Step 4' },
    { title: 'Step 5' },
    { title: 'Step 6' },
  ]);

  useEffect(() => {
    if (authUser.type) {
      setAccountType(authUser.type);
      dispatch(nextWizardStep());
    }
  }, [authUser.type]);

  useEffect(() => {
    if (accountType === AccountTypes.COMPANY) {
      setSteps([
        { title: 'Step 1' },
        { title: 'Step 2' },
        { title: 'Step 3' },
        { title: 'Step 4' },
        { title: 'Step 5' },
        { title: 'Step 6' },
      ]);
    } else {
      setSteps([{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]);
    }
  }, [accountType]);

  const canBack = useMemo(() => {
    if (step > 0) {
      return (step === 1 && authUser.type) ? false : true;
    } else {
      return false;
    }
  }, [step, authUser.type]);

  const canNext = useMemo(() => {
    return step > 0 && step < steps.length - 1
  }, [step]);

  const handleAccountTypeSelect = (accountType) => {
    setAccountType(accountType);
  };

  const handleAccountTypeNext = () => {
    dispatch(setWizardAccountType(accountType));
    if (accountType !== wizardAccountType) {
      dispatch(setCompletedLastWizardStep(1));
    }
    next();
  };

  const next = () => {
    const wizardBtn = document.getElementsByClassName('wizardBtn');
    if (wizardBtn.length === 1) {
      wizardBtn[0].click();
    } else {
      dispatch(nextWizardStep());
    }
  };

  const prev = () => {
    dispatch(prevWizardStep());
  };

  const onStepChange = (current) => {
    if (current > completedLastStep) return;
    dispatch(setWizardStep(current));
  };

  if (authUser.profileCompleted) {
    return <Redirect to="/dashboard" />
  }

  return (
    <AccountWizardStyleWrapper >
      <div className="step-container">
        <div className="steps-content">
          {step === 0 && !authUser.type &&
            <ChooseAccount
              accountType={accountType}
              onSelect={handleAccountTypeSelect}
              onNext={handleAccountTypeNext}
            />
          }

          {step > 0 && accountType === AccountTypes.COMPANY && (
            <CompanyAccountWizard step={step} />
          )}

          {step > 0 && accountType === AccountTypes.PRODUCER && (
            <ProducerAccountWizard step={step} />
          )}

          {step > 0 && accountType === AccountTypes.CREW && (
            <CrewAccountWizard step={step} />
          )}
        </div>

        <div className="steps-action">
          <div className="navBtnWrapper">
            {canBack && (
              <Button
                type="link"
                className="step-back"
                onClick={() => prev()}
              >
                <Icon image={StepBack} width={30} height={30} />
                Back
              </Button>
            )}
          </div>

          <Steps current={step} className="steps-nav" onChange={onStepChange}>
            {steps.map((item, index) => (
              <Step
                className={`step-nav-item ${accountType === wizardAccountType && index === completedLastStep ? 'completed-last-step' : ''}`}
                key={item.title}
                title={item.title}
              />
            ))}
          </Steps>

          <div className="navBtnWrapper">
            {canNext && (
              <Button type="link" className="step-next" onClick={() => next()}>
                Next
                <Icon image={StepNext} width={30} height={30} />
              </Button>
            )}
          </div>
        </div>
        <div className="footer-logo">
          <img src={Logo} />
        </div>
      </div>
    </AccountWizardStyleWrapper>
  );
}

export default AccountWizard;
