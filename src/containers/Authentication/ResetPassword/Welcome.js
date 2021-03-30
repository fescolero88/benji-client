import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeStyleWrapper from './Welcome.style';
import Button from '@iso/components/uielements/button';
import Logo from '@iso/assets/images/logo-blue.svg';

export default () => {
  return (
    <WelcomeStyleWrapper>
      <div className="isoLogoWrapper">
        <img src={Logo} />
      </div>
      <div className="isoResetPasswordWelcomeContentWrapper">
        <div className="isoResetPasswordWelcomeContent">
          <div className="isoResetPasswordWelcomeForm">
            <div className="isoResetPasswordWelcomeTitleWrapper">
              <h3>Password Reset Successful!</h3>
            </div>
            <div className="isoWelcomeTextWrapper">
              You can now use your new password to login to your account
            </div>
            <div className="isoActionWrapper">
              <Link to="/login">
                <Button type="primary" shape="round">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WelcomeStyleWrapper>
  );
};