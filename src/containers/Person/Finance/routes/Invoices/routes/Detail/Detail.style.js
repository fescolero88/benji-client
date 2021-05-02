import styled from 'styled-components';
import { palette } from 'styled-theme';

const ContractorInvoiceDetailWrapper = styled.div`
  width: 100%;

  .PageHeader {
    padding: 30px 70px 30px 30px;
    background: #ffffff;
    
    .invoiceNumberWrapper {
      display: flex;
      align-items: center;
      margin-left: 40px;
      
      .invoiceNumber {
        font-size: 25px;
        font-weight: bold;
        color: ${palette('text', 5)};
      }
      
      button {
        margin-left: 20px;
      }
    }
    
    .goBackBtn {
      margin-right: 20px; 
    }
    
    .jobInfoWrapper {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
    }
  }
  
  .PageSubHeader {
    padding: 22px 70px 16px 70px;
    display: flex;
    align-items: center;
    
    .inlineTextBlock {
      color: ${palette('text', 5)};
      margin-right: 30px;
      
      label {
        font-size: 15px;
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
  
  .divider {
    border: 1px solid #b4b4c6;
  }
  
  .PageContent {
    padding: 30px 70px;
  }  
`;

const ContractorInvoiceEditWrapper = styled.div`
  .editButtonWrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 30px 0 50px;
     
    .totalInvoice {
      label {
        font-size: 22px;
        margin-right: 30px;
        vertical-align: middle;
      }
      font-size: 35px;
      font-weight: bold;
      margin-right: 30px;
    }
  }
  
  .invoiceForm {
    padding: 0;
    border-radius: 10px;
    
    .invoiceFormHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${palette('border', 0)};
      padding: 25px 30px;
      
      .rightSideAction {
        display: flex;
        align-items: center;
        
        .totalPrice {
          margin-left: 30px;
          font-size: 30px;
          font-weight: bold;
          
          label {
            font-size: 15px;
            display: block;
          }
        }
      }
    }
    
    .invoiceFormBody {
      padding: 0;
    }
    
    .invoiceFormFooter {
      margin-bottom: 30px;
      text-align: center;
    }
    
    .documentListWrapper {
      padding: 30px 25px;
      border-bottom: 1px solid ${palette('border', 0)};
    }
    
    .serviceWrapper {
      padding: 30px 25px 0 25px;
      
      .title {
        font-size: 15px;
        font-weight: bold;
        color: ${palette('text', 5)};
      }
      
      .serviceForm {        
        margin-top: 10px;
      }
    }
  }
  
  .receiptForm {
    padding: 0;
    border-radius: 10px;
    
    .receiptFormHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 30px;
      border-bottom: 2px solid ${palette('border', 0)};
      
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      
      .totalPrice {
        label {
          display: block;
          font-size: 15px;
        }
        font-size: 20px;
        font-weight: bold;
      }
    }
    
    .receiptFormBody {
      padding: 30px;
    }
    
    .uploadFormWrapper {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid ${palette('border', 0)};
    }
    
    .receiptListWrapper {      
      padding-bottom: 30px;
    }
  }
  
  .invoicePreview {
    padding: 0;
    
    .invoicePreviewHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 30px;
      border-bottom: 2px solid ${palette('border', 0)};
      
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      
      .actions {
        button {
          margin-left: 20px;
        }
      }
    }
    
    .invoicePreviewBody {
      max-width: 900px;
      margin: auto;
    }
  }
`;

const ContractorInvoiceViewWrapper = styled.div`
  .invoiceView {
    padding: 0;
    border-radius: 10px;
    
    .invoiceViewHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 25px 30px;
      border-bottom: 2px solid ${palette('border', 0)};
      
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
    
    .invoiceViewBody {
      padding: 25px 30px;
    }
    
    .paymentSentInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;      
      margin-bottom: 30px;
      
      .totalInvoicePrice {
         font-size: 20px;
         font-weight: bold;
         color: ${palette('text', 5)};
         vertical-align: middle;
      }
    }
    
    .editInvoiceBtn, .resendInvoiceBtn {
      background: #e8e8f1;
      color: #ffffff;
    }
  }
  
  .invoicePreview {
    padding: 0;
    border-radius: 10px;
    
    .invoicePreviewHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 30px;
      border-bottom: 2px solid ${palette('border', 0)};
      
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
    
    .invoicePreviewBody {
      max-width: 900px;
      margin: auto;
    }
  }
`;

export { ContractorInvoiceEditWrapper, ContractorInvoiceViewWrapper };

export default ContractorInvoiceDetailWrapper;
