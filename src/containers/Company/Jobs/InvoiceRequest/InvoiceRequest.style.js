import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const AntModal = props => <Modal {...props} />;

const StyledModal = styled(AntModal)`
  .ant-modal-close {
    top: 25px;
    color: ${palette('text', 5)};
  } 
  
  .ant-modal-content {
    border-radius: 10px;
  }
  
  .ant-modal-header {
    border-radius: 10px 10px 0 0;
    padding: 25px 55px 25px 35px;
    border-bottom: 2px solid #b4b4c6;
    
    .ant-modal-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;      
    
      .title {
        font-size: 25px;
        color: ${palette('text', 5)};
        font-weight: bold;    
      }
      
      .invoiceTotals {
        display: flex;
        align-items: center;
        
        label {
          font-size: 15px;
          font-weight: bold;
          color: ${palette('text', 5)};
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        input {
          pointer-events: none;
          font-size: 20px;
          font-weight: bold;
          color: ${palette('text', 5)}; 
        }
        
        .totalCrew {
          margin-right: 35px;
          display: flex;
          align-items: center;
          
          input {
            width: 115px;
          }
        }
        
        .totalAmount {
          display: flex;
          align-items: center;
          
          input {
            width: 185px;
          }
        }
      }
    }
  }
  
  .ant-modal-body {
    padding: 16px 32px;
    background: #f5f7fa;
    color: ${palette('text', 5)};
    height: 625px;
    overflow-y: auto;
  }
  
  .ant-modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 30px 35px;
    
    button {
      margin-left: 15px;
    }    
  }  
`;

const InvoiceRequestContentWrapper = styled.div`
  width: 100%;
  
  .invoiceDepartmentList {
    border: 1px solid #e8e8f1;
    border-radius: 10px;
    overflow: hidden;
  }
  
`;

export { InvoiceRequestContentWrapper };

export default StyledModal;