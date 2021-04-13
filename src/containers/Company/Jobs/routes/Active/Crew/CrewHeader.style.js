import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';
import { palette } from 'styled-theme';

const WDCrewHeaderWrapper = styled.div`
  display: flex;

  .jobContent {
    width: 100%;
    .customFieldControl .fieldControl,
    .ant-picker,
    .ant-picker-input .ant-input-affix-wrapper {
      border-color: #e0e1e9;
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
    }
    .fieldControl {
      &.successField {
        background-color: #e0efdf;
        color: ${palette('text', 5)};
        font-weight: bold;
      }
      &.ErrorField {
        background-color: red;
      }
    }   
      
    .saveTemplateBtn {
      width: 50px;
      height: 50px;
      padding: 16px;
      background-color: #ffffff;
      border: transparent;
      box-shadow: none;
      
      .anticon {
        color: #51369a;
        font-size: 18px;
      }
    }  
    
    .bookCrewBtn {
      background-color: rgba(81, 54, 154, 1);
      border-color: rgba(81, 54, 154, 1);
      color: #ffffff;
      &:hover {
        background-color: rgba(81, 54, 154, .8);
        border-color: rgba(81, 54, 154, .8);
      }
    }  
  }
  
  .fieldControl {
    width: 100%;
  }
  
  .jobImageWrapper {
    margin-right: 20px;

    .jobImage {
      width: 120px;
      height: 120px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
    }

    .emptyImage {
      width: 120px;
      height: 120px;
      border: 1px solid #e0e0e0;
      border-radius: 7px;
      margin: 0 !important;
      flex-direction: column;
      display: flex;
      justify-content: center;
    }
  }

  .jobTitle {
    font-size: 18px;
    color: #2f80ed;

    button {
      margin-left: 15px;
    }
  }

  .jobRefreshBtn {
    margin-left: 20px;
    font-size: 18px;
    vertical-align: middle;
  }
`;

const JobDetailWrapper = WithDirection(WDCrewHeaderWrapper);

export default JobDetailWrapper;
