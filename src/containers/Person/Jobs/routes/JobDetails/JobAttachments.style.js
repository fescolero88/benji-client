import styled from 'styled-components';
import { palette } from 'styled-theme';

const ContractorJobAttachmentsWrapper = styled.div`  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  .attachmentBox {
    display: flex;
    align-items: center;
    border: solid 1px #e8e8f1;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 12px 30px 12px 12px;;
    margin: 0 15px 15px 0;
    position: relative;
    
    .attachmentDetails {
      color: #a2a2a9;
      flex: auto;
      display: flex;
      align-items: center;
      
      .attachmentTitle {
        margin: 0 5px;
        font-weight: bold;
        color: #3b86ff;
        display: inline-block;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
    .removeBtn {
      position: absolute;
      right: 5px;
      width: 20px;
    }
  }
`;

export default ContractorJobAttachmentsWrapper;
