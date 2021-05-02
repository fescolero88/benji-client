import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";
import { palette } from 'styled-theme';

const WDInvoiceJobDetailWrapper = styled.div`
  width: 100%;
  background: #ffffff;

  .header-top {
    display: flex;
  }

  .header-title {
    h1 {
      position: relative;
      font-size: 25px;
      font-weight: bold;
      color: #2f2e50;
      margin: 7px 0 0 0;
    }

    p {
      font-size: 15px;
      font-weight: normal;
      color: #2f2e50;
    }
  }
  
  .header-left {
    display: flex;
    align-items: center;
    
    .goBackBtn {
      margin-right: 20px;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    justify-items: center;
    margin-left: auto;
    color: ${palette('text', 5)};   
    
    .invoiceTotal {
      label {
        font-size: 15px;
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
      }
      
      .totalAmount {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
`;

const InvoiceJobDetailWrapper = WithDirection(WDInvoiceJobDetailWrapper);

export default InvoiceJobDetailWrapper;
