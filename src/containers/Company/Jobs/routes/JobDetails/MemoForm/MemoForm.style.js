import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { palette } from 'styled-theme';

const AntModal = props => (
  <Modal
    footer={null}
    closable={false}
    maskClosable={false}
    {...props}
  />
);

const StyledMemoModal = styled(AntModal)`
  .ant-modal-content {
    border-radius: 10px;
  }

  .ant-modal-body {
    padding: 0;
  }
`;

export const MemoFormWrapper = styled.div`
  .MemoHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #b4b4c6;
    padding: 30px;
    
    .title {
      font-size: 25px;
      font-weight: bold;
      color: ${palette('text', 5)};
    }
  }
  
  .MemoBody {
    padding: 30px;
  }
  
  
  .MemoForm {
    .locked {
      pointer-events: none;
    }    
  } 
  
  .radioLabel {
    
  }
  
  .priceTypeOption, .rateTypeOption {
    margin-bottom: 8px;    
  }
  
  .fieldLabel {
    color: #868698;
  }
  
  
  .helper-text {
    color: #eb5757;
  }
  
  .topField {
    padding-bottom: 20px;
    border-bottom: 2px solid #b4b4c6;
    
    .formGroup {
      .ant-radio-wrapper span {
        color: #868698;
      }
    }
  }
  
  .middleField {
    padding-top: 40px;
      
    span.radioLabel {
      color: #868698;
    }
  }
  
  .bottomField {
    padding-bottom: 20px;
    border-bottom: 2px solid #b4b4c6;
  
    .rateList {
      padding: 20px;
      background-color: #fafafa;
      border: 1px solid #e8e8f1;
      border-radius: 5px;
      margin-bottom: 20px;
    
      button {
        width: 113px;
        margin-right: 10px;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
    
    .addRateFieldBtn {
      color: #3b86ff;
    }
    
  }

`;

export const MemoAttachmentWrapper = styled.div`
  margin-top:30px;
  padding-top: 20px;
  border-top: 2px solid #b4b4c6;
  display: flex;
  flex-wrap: wrap;

  .attachment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 17px;
    border: 1px solid #e8e8f1;
    background: #fafafa;
    margin: 0 20px 20px 0;
    
    &:last-child {
      margin-right: 0;
    }
    
    .nameAndSize {
      flex: auto;
      overflow: hidden;
      display: flex;
      align-items: center;
      
      .name {
        font-weight: 600;
        color: #3b86ff;
        max-width: 150px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
    
    button {
      flex: 0 0 20px;
      margin-left: 10px;
    }
  }
`;

export const MemoFormButtonsWrapper = styled.div`
  padding-top: 30px;
  
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
`;

export default StyledMemoModal;
