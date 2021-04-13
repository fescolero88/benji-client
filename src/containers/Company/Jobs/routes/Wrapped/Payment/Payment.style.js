import styled from 'styled-components';
import { palette } from 'styled-theme';

const WrappedJobPaymentWrapper = styled.div`
  width: 100%;
  
  .jobPaymentWrapper {
    padding: 30px 40px;
    
    .paymentActionButtons {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 25px;
      
      .left {
        .payApprovedBtn {
          background-color: #19913d;
          border-color: #19913d;
          color: #ffffff;
          margin: 0 20px;
          width: 220px;
    
          &:hover, &:focus {
            background-color: #19913d;
            border-color: #19913d;
          }
        }
      }
      
      .right {
        display: flex;
        
        .crewActual {
          display: flex;
          align-items: center;
          margin-right: 30px;
          
          label {
            flex-shrink: 0;
            font-size: 15px;
            font-weight: bold;
            color: ${palette('text', 5)};
            margin-right: 20px;
          }
          
          input {
            background: #e0efdf;
            border-color: #e0e1e9;
            color: ${palette('text', 5)};
            pointer-events: none;
          }
        }
        
        .jobDocumentBtn {
          background-color: #ffffff;
          border-color: #19913d;
          color: #19913d;
    
          &:hover, &:focus {
            border-color: #19913d;
          }
        }
      }
    }
  }
  
  .paymentTableWrapper {
    margin-bottom: 25px;
    border-radius: 10px;
    border: 1px solid #e8e8f1;
    overflow: hidden;
  }

`;

export default WrappedJobPaymentWrapper;
