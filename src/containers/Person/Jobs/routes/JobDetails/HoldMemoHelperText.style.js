import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';

const WDHoldMemoHelperTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #51369a;
  color: #fff;
  overflow: hidden;

  .stepBox {
    max-width: 25%;
    min-width: 130px;
    padding: 20px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 1.3;
    strong {
      font-size: 16px;
      min-width: 36px;
      height: 36px;
      line-height: 36px;
      border-radius: 50px;
      background-color: #fff;
      color: #51369a;
      text-align: center;
      margin-right: 20px;
    }
  }

  .stepBoxFirst {
    padding: 20px 0 20px 24px;
    font-weight: bold;
    font-size: 20px;
    flex-shrink: 0;
  }

  .stepBoxLast {
    font-size: 12px;
    padding: 20px 30px 20px 20px;
    line-height: normal;
    strong {
      background: #a3a0fb;
      color: #322d72;
    }
    a {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -8px;
      svg {
        width: 16px;
        height: 16px;
        color: #9996b9;
      }
    }
  }

  .stepBoxBorder:after {
    position: absolute;
    content: '';
    height: 40px;
    width: 1px;
    background: #a3a0fc;
    top: 50%;
    right: 0;
    margin-top: -20px;
  }
`;

const HoldMemoHelperTextWrapper = WithDirection(WDHoldMemoHelperTextWrapper);

export default HoldMemoHelperTextWrapper;
