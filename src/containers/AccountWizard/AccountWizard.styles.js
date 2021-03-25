import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";
import { palette } from 'styled-theme';

const AccountWizardStyleWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: rgb(240, 240, 247);
  background: linear-gradient(
    180deg,
    rgba(240, 240, 247, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  position: relative;
  padding: 50px;

  h1 {
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: #2f2e50;
  }

  .white-box {
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    border: solid 1px #f0f0f7;
    background-color: #ffffff;
    position: relative;
    max-width: 800px;
    margin: 40px auto;
    min-height: 450px;
    
    h2 {
      text-align: center;
      font-size: 20px;
      color: #2f2e50;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .ant-row {
      width: auto !important;
    }
    
    .fieldLabel {
      color: #868698;
    }
  } 
  
  .steps-nav {
    max-width: 750px;
    position: relative;
    &::before {
      content: "";
      width: 96%;
      height: 3px;
      background-color: #3b86ff;
      position: absolute;
      left: 0;
      top: 22px;
    }
  }

  .step-nav-item {
    .ant-steps-item-icon .ant-steps-icon {
      top: 1px;
    }
  
    &.ant-steps-item-active {
      .ant-steps-item-icon {
        background-color: #ffffff !important;
        span {
          color: #3b86ff;
        }
      }
    }
    
    &.ant-steps-item-finish {
      .ant-steps-item-icon {
        background-color: #3b86ff !important;
        span {
          color: #ffffff;
        }
      }
    }
    
    &.completed-last-step {
      .ant-steps-item-icon:before {
        content: "";
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        border-radius: 50%;
        border: 3px solid #3b86ff;
      }      
    }

    .ant-steps-item-content {
      display: block;

      .ant-steps-item-title {
        font-weight: normal;
        font-size: 13px;
        color: #2f2e50;
        &::after {
          display: none;
        }
      }
    }

    .ant-steps-item-icon {
      border: solid 3px #3b86ff;
      width: 38px;
      height: 38px;
      color: #3b86ff;
      display: flex;
      align-items: center;
      justify-content: center;
      
      span {
        color: #3b86ff;
      }
    }
  }
  
  .step-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
  
  .steps-content {
    min-height:530px;
    max-width: 1260px;
    margin: auto;
  }

  .steps-action {
    padding: 0px 50px;
    margin-top: 100px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .navBtnWrapper {
      width: 120px;
      margin: 0 100px;
      
      button {
        font-size: 20px;
        color: #2f2e50;
        font-weight: normal;
        border-color: transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
  
        &::after {
          display: none;
        }
        
        &.step-back {
          img {
            margin-right: 30px;
          }
        }
        
        &.step-next {          
          img {
            margin-left: 30px;
          }
        }
      }
    }
  }
  
  .helper-text {
    color: ${palette('error', 0)};
  }
  
  .wizardBtn {
    width: 200px;
  }  
  
  .footer-logo {
    text-align: center;
    margin-top: 55px;
    
    img {
      max-width: 100px;
    }
  }
  
`;

export default WithDirection(AccountWizardStyleWrapper);
