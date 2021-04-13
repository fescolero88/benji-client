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
      button.ant-btn {
        width: 50px;
        height: 50px;
        margin: 0;
        padding: 16px;
        background-color: #ffffff;
        border: transparent;
        box-shadow: none;
        svg {
          fill: #ffc06a !important;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  .fieldLabel {
    display: block;
    margin-bottom: 4px;
    color: #2f2e50;
    font-weight: bold;
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
