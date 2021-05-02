import styled from 'styled-components';
import { palette } from 'styled-theme';

const InvoiceServiceFormWrapper = styled.div`
  .customServiceRow {
    .formGroup {
      margin-right: 10px;
      
      label {
        font-size: 13px;
      }
    }
  }
  
  .serviceAction {
    text-align: right;
    margin-top: 20px;
    button {
      margin-right: 30px;
      width: 200px;
    }
  }
  
  .serviceFormFooter {
    text-align: center;
    padding: 30px;
    border-top: 2px solid ${palette('border', 0)}; 
    margin-top: 30px;
  }
  
  .formGroup {
    margin-bottom: 10px;
  
    .fieldLabel {
      display: block;
      
      &.required::after {
        content: '*';
        color: #eb5757;
      }
    }
    
    .helper-text {
      color: #eb5757;
    }
  }  
`;

export default InvoiceServiceFormWrapper;
