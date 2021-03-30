import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/blue-bg.svg';

const WelcomeStyleWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  
  .isoSignUpWelcomeContentWrapper {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
    background-color: #ffffff;
    border-radius: 6px 0 0 6px;
  } 

  .isoSignUpWelcomeContent {
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
    
    .isoSignUpWelcomeTitleWrapper {
      margin-bottom: 30px;
      
      h3 {
        font-size: 40px;
        font-weight: bold;
        color: ${palette('text', 6)};
      }      
    }
    
    .isoSignUpWelcomeForm {
      width: 475px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      
      .isoWelcomeTextWrapper {
        margin-bottom: 20px;
      }
    }
  }
`;

export default WithDirection(WelcomeStyleWrapper);