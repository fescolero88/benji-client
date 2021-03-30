import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';
import WelcomeStyleWrapper from './Welcome.style';
import Button from '@iso/components/uielements/button';
import Logo from '@iso/assets/images/logo-blue.svg';
import notify from '@iso/lib/helpers/notify';
import { resendVerificationEmailRequest } from '@iso/redux/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const { user: signUpUser } = useSelector(state => state.Auth.signup);
  const { resendVerification } = useSelector(state => state.Auth);
  const [action, setAction] = useState('');

  useEffect(() => {
    if (!resendVerification.loading && !resendVerification.error && action === 'resend') {
      notify('success', 'Email resent successfully');
    }

    if (!resendVerification.loading && action === 'resend') {
      setAction('');
    }
  }, [resendVerification]);

  const handleEmailResend = () => {
    setAction('resend');
    const payload = {email: signUpUser.email};
    dispatch(resendVerificationEmailRequest(payload))
  };

  if (!signUpUser || !signUpUser.email) {
    return <Redirect to={'/'} />
  }

  return (
    <WelcomeStyleWrapper>
      <div className="isoLogoWrapper">
        <img src={Logo} />
      </div>
      <div className="isoSignUpWelcomeContentWrapper">
        <div className="isoSignUpWelcomeContent">
          <div className="isoSignUpWelcomeForm">
            <div className="isoSignUpWelcomeTitleWrapper">
              <h3>Thanks for signing up to Benji!</h3>
            </div>
            <div className="isoWelcomeTextWrapper">
              To start exploring Benji app, please verify your account by clicking the link in email.
            </div>
            <div className="isoActionWrapper">
              <p>Didn't receive your email?</p>
              <Button
                type="primary"
                shape="round"
                onClick={handleEmailResend}
                loading={action === 'resend'}
              >
                Resend email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WelcomeStyleWrapper>
  );
};