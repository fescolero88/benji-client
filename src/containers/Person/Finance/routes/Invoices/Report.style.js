import styled from 'styled-components';
import { palette } from 'styled-theme';

const FinanceReportWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  border: 1px solid ${palette('border', 0)};
  box-shadow: 1px 5px 5px 0 ${palette('border', 0, 0.15)};
  border-radius: 10px;
  overflow: hidden;
  
  li {
    flex: 1;
    border-right: 1px solid ${palette('border', 0)};
    
    &:last-child {
      border: none;
    }
  }
`;


const WidgetBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;  
  padding: 20px;
  background-color: #ffffff;
  overflow: hidden;
  
  .isoColorIndicator {
    display: flex;
    width: 4px;
    margin: 0px 10px 0px 0px;
    flex-shrink: 0
  }
  
  .isoWidgetText {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    
    .isoWidgetLabel {
      font-size: 13px;
      color: ${palette('text', 5)};
    }
  
    .isoWidgetPrice {
      font-size: 25px;
      font-weight: bold;
      line-height: 1.36;
      margin: 0 0 10px;
      color: ${palette('text', 5)};
    }  
  }  
`;

export { WidgetBox };

export default FinanceReportWrapper;
