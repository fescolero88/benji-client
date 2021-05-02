import styled from 'styled-components';
import { palette } from 'styled-theme';

const InvoiceFormWrapper = styled.div`
  .billingWrapper {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid ${palette('border', 0)};
    padding: 30px 25px; 
    
    .leftSideContent {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 50%;
      
      .title {
        font-size: 15px;
        font-weight: bold;
        color: ${palette('text', 5)};
        margin-bottom: 10px;
      }
      
      p {
        margin-bottom: 10px;
      }
      
    }
    
    .rightSideContent {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 200px;
      
      .formGroup {
        margin-bottom: 20px;
      }
    }      
  }
  
  .memoWrapper {
    background: #f5f7fa;
    padding: 30px 25px;
    border-bottom: 2px solid ${palette('border', 0)};
    
    .title {
      font-size: 14px;
      font-weight: bold;
      color: ${palette('text', 5)};
    }
    
    .invoiceMemoInfo {
      margin-top: 20px;
      
      .priceTypeOption {
        margin-bottom: 8px;
      }
    }
  }  
`;

export default InvoiceFormWrapper;
