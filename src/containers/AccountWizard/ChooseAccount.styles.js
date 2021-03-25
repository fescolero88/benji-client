import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';
import radioCheck from '@iso/assets/images/radio_check.svg';

const ChooseAccountStyleWrapper = styled.div`
  .account-options {
    margin-top: 20px;
    width: 100%;
  }

  .account-option {
    width: 100%;
    height: 100%;
    padding: 0;
    background: none !important;
    border: none !important;
    box-shadow: none !important;

    &::before {
      display: none !important;
    }

    &.ant-radio-button-wrapper-checked {
      color: #ffffff;
      
      .card {
        background-color: #51369a;
        box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.4);
        border-color: transparent;
        color: #ffffff;

        &::before {
          content: "";
          position: absolute;
          top: 30px;
          right: 30px;
          height: 25px;
          width: 25px;
          z-index: 1;
          background: url(${radioCheck}) no-repeat center center;
        }

        .card-content {
          ul {
            color: #ffffff;          
          }
        }       
        
        .pricingAmount.free {
          span {
            color: #ffffff;
          }                                                  
        }        
      }
    }
  }

  .card-icon {
    height: 88px;
    width: 88px;
    margin: 0 auto;
    text-align: center;
    line-height: 88px;
    border-radius: 100px;
    background-color: #f0f0f7;
    img {
      max-width: 37px;
    }
  }

  .card {
    padding: 30px 48px;
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    border: solid 1px #f0f0f7;
    background-color: #ffffff;
    position: relative;
    max-width: 395px;
    height: 100%;
    font-size: 15px;
    color: ${palette('text', 5)};
    
    .card-head {
      padding: 25px 0;
      border-bottom: solid 1px #e8e8f1;
      
      .card-title {
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        color: inherit;
      }
    }
    
    .card-price {
      padding: 20px 0;
      text-align: center;
      border-bottom: solid 1px #e8e8f1;
      
      .pricingAmount {
        text-align: center;
        
        span {
          font-size: 37px;
          font-weight: bold;
        }
        
        &.free {
          span {
            color: #51369a;
          }
        }
      }
    }
    
    .card-content {
      padding: 35px 10px 30px 20px;
      
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        color: #000000;
  
        li {
          font-size: 15px;
          display: flex;
          align-items: center;
          
          span {
            margin-left: 20px;
          }
        }
      }
    }

    
    .card-action {
      text-align: center;
      
      button {
        width: 180px;
        height: 54px;
      }
    }
  }
`;

export default WithDirection(ChooseAccountStyleWrapper);
