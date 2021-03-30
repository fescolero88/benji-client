import styled from 'styled-components';
import { palette } from "styled-theme";
import WithDirection from '@iso/lib/helpers/rtl';
import bgImage from '@iso/assets/images/blue-bg.svg';

const SignUpStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .isoLogoWrapper {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
    
    img {
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
      width: 50%;
      
      @media only screen and (max-width: 767px) {
        position: relative;
        top: 0%;
        transform: none;
        left: 25%;
        padding: 2rem 0;
      }
    }
  }
  
  .isoSignUpContentWrapper {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
    background-color: #ffffff;
    border-radius: 6px 0 0 6px;
  } 

  .isoSignUpContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
    
    .isoSignUpTitleWrapper {
      margin-bottom: 30px;
      
      h3 {
        font-size: 30px;
        font-weight: bold;
        color: ${palette('text', 6)};
        text-align: center;
      }      
    }

    .isoSignUpForm {
      width: 450px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      
      .isoPasswordStrengthWrapper {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 20px;
        
        .isoPasswordStrength {
          flex: auto;
          margin-right: 10px;
        }
        
        .isoPasswordScore {
          color: ${palette('text', 7)};
          margin-right: 10px;
        }
        
        .isoPasswordHint {
          color: ${palette('primary', 0)};
        }
      }
      
      .isoAcceptTermsWrapper {
        margin: 30px 0;
      }
      
      .isoTosButton {
        color: #2f80ed;
      }
      
      .isoPrivacyButton {
        color: #2f80ed;
      }
      
      .fieldLabel {
        font-size: 13px;
        color: ${palette('text', 7)};
      }

      &:last-of-type {
        margin-bottom: 0;
      }
      
      .helper-text {
        color: #ff4d4f;
      }

      input {
        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }
    }
  }
  
  .isoSignUpTokenError {
    font-size: 30px;
    color: #ffffff;
  }
`;

const PasswordHintTextWrapper = styled.div`
  font-size: 11px;
  
  ul {
    padding-left: 14px;
    
    li {
      &::marker {
        color: #19913d;
      } 
    }
  }
`;

export { PasswordHintTextWrapper };

export default WithDirection(SignUpStyleWrapper);
