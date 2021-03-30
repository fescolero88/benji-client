import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/blue-bg.svg';
import WithDirection from '@iso/lib/helpers/rtl';

const SignInStyleWrapper = styled.div`
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
  
  .isoLoginContentWrapper {
    width: 100%;
    height: 100%;
    border-radius: 6px 0 0 6px;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    background-color: #ffffff;
  }

  .isoLoginContent {
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

    .isoLoginTitleWrapper {
      margin-bottom: 30px;
      
      h3 {
        font-size: 30px;
        font-weight: bold;
        color: ${palette('text', 6)};
      }      
    }

    .isoSignInForm {
      width: 430px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      
      .isoInputWrapper {
        margin-bottom: 20px;
         
        .helper-text {
          color: #ff4d4f;
        }
        
        .field-label {
          font-size: 13px;
          color: ${palette('text', 7)};
        }
        
        .isoForgotPass {
          font-size: 15px;
          color: ${palette('text', 8)};
        }
        
        .isoSignupButton {
          color: #2f80ed;
        }

        &:last-of-type {
          margin-bottom: 0;
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
      
      .isoActionWrapper {
        margin-top: 30px;
      }
      
      .isoHelperWrapper {
        margin-top: 35px;
        flex-direction: column;
      }

      .isoRememberMe {
        font-size: 15px;
        color: ${palette('text', 3)};
      }

      .isoForgotPass {
        font-size: 15px;
        color: ${palette('text', 3)};
        text-decoration: none;

        &:hover {
          color: ${palette('primary', 0)};
        }
      }

      .isoSignInBtn {
        width: 180px;
      }
      
      .isoSignUpBtn {
        width: 180px;
      }
    }
  }
`;

export default WithDirection(SignInStyleWrapper);
