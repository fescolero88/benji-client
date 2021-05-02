import styled from 'styled-components';
import { palette } from 'styled-theme';

const ContractorInvoiceCardWrapper = styled.div`
  width: 100%;
  padding: 20px 25px;  
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #f0f0f7;
  background-color: #ffffff;
  position: relative; 
  
  .moreAction {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  
  .invoiceHeader {
    margin-bottom: 25px;
  }
  
  .invoiceBody {
    color: ${palette('text', 5)};
    
    .jobTitle {
      font-size: 25px;
      font-weight: bold;      
      margin-bottom: 10px;
    }
    
    .jobHeadText {
      margin-bottom: 35px;
    }
    
    .jobText {
      font-size: 13px;
      line-height: 1.36;
      display: flex;
      margin-bottom: 10px;
      
      .inlineText {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
      
      .blockText {
        margin-right: 40px;
      }
    }
  }
  
  .invoiceFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    border-top: 1px solid #b4b4c6;
    
    .totalPayPrice {
      font-size: 30px;
      color: ${palette('text', 0)};
      font-weight: bold;
    }
  }
`;

export default ContractorInvoiceCardWrapper;
