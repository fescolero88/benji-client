import styled from 'styled-components';
import { palette } from 'styled-theme';

const ContractorJobMemoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  .memoInfos {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: row;    
    padding: 20px 0;
    border-bottom: 1px solid #e8e8f1;
    
    &:first-child {
      padding-top: 20px;
    }
    
    .infoLabel {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 140px;
      margin-right: 20px;      
      
      span {
        font-size: 15px;
        font-weight: bold;
        color: ${palette('text', 5)};
        margin-left: 20px;
      }
      
    }
    
    .infoDetails {
      text-align: left;
    }
  }  

  h4 {
    display: inline-block;
    font-size: 15px;
    margin-left: 20px;
    font-weight: bold;
    color: #2f2e50;
  }
`;

export default ContractorJobMemoWrapper;
