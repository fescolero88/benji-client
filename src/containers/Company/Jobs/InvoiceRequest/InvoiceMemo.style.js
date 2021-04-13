import styled from 'styled-components';
import { palette } from 'styled-theme';

const InvoiceMemoWrapper = styled.div`
  .invoiceMemoWrapper {
    padding: 25px 30px;
    
    .title {
      margin-bottom: 20px;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      
      input[type="file"] {
        display: none;
      }
      
      button {
        min-width: 160px;
        height: 54px;
        margin-right: 20px;
        
        &.ant-btn-circle {
          background: #e0e1e9;
          width: 54px;
          height: 54px;
          min-width: 0;
        }
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  
  .jobMemoWrapper {
    background: #f5f7fa;
    padding: 20px 30px;
    
    .jobMemoCollapse {
      .ant-collapse-header {
        border-bottom: 1px solid #b4b4c6;
        padding: 13px 0;
      }
      
      .ant-collapse-content-box {
        padding: 15px 0;
      }
    }
  }
  
  .divider {
    border: 1px solid #b4b4c6;
    margin: 20px 0;
  }
  
  .helper-text {
    color: #eb5757;
  }
  
  .priceTypeOption {
    margin-bottom: 8px;    
  } 
`;

const InvoiceMemoSectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${palette('text', 5)};
`;

export { InvoiceMemoSectionTitle };
export default InvoiceMemoWrapper;