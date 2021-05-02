import styled from 'styled-components';
import { palette } from 'styled-theme';

const ContractorInvoicesWrapper = styled.div`
  width: 100%;
  padding: 20px 25px;
  
  .pageTitle {
    font-size: 25px;
    font-weight: bold;
    color: #2f2e50;
  }
  
  .financeReportWrapper {
    margin-top: 20px;
  }
  
  .totalPaidWidget {
    .totalPaidWidgetLabelWrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    
    .paidMonthDropdown {
      width: 130px;
      
      .ant-select-selector {
        border-radius: 10px;
        height: 25px;
      }     
    }
  }
  
  .invoiceListWrapper {
    margin-top: 30px;
    
    .actionWrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      
      .sortBy {
        width: 200px;
        
        .ant-select-selector {
          border-radius: 25px;
        }
      }
    }
  }

`;

const LocationSpan = styled.span`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

const TotalInvoice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export { LocationSpan, TotalInvoice };
export default ContractorInvoicesWrapper;
