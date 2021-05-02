import styled from 'styled-components';
import { palette } from 'styled-theme';

const InvoiceReceiptListWrapper = styled.div`
  width: 100%;
  
  .receiptItem {
    height: auto;
    display: flex;
    border-radius: 10px;
    
    .receiptThumb {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      
      img {
        width: 100%;
      }
    }
    
    .receiptText {
      p {
        margin-bottom: 10px;
      }
    }
    
    .receiptAmount {
      font-size: 25px;
      font-weight: bold;
    }
  }
  
  .receiptAction {
    position: absolute;
    right: 25px;
    display: flex;
    flex-direction: column;
    
    button {
      margin-bottom: 10px;
    }
  }
`;

export default InvoiceReceiptListWrapper;