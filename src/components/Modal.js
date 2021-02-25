import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import MultiplyIcon from './icons/Multiply';
import WithDirection from '@iso/lib/helpers/rtl';


const AntModal = props => <Modal closeIcon={<MultiplyIcon width={16} height={16} />} {...props} />;

const isoModal = styled(AntModal)`
  .ant-modal-close {
    top: 20px;
  } 
  
  .ant-modal-content {
    border-radius: 10px;
  }
  
  .ant-modal-header {
    border-radius: 10px 10px 0 0;
    padding: 40px 30px 30px 30px;
    border-bottom: 2px solid #b4b4c6;
    
    .ant-modal-title {
      font-size: 25px;
      color: ${palette('text', 5)};
      font-weight: bold;    
    }
  }
  
  .ant-modal-footer {
    padding: 30px;
  }
`;

export default WithDirection(isoModal);
