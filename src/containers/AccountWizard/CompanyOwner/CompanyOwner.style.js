import styled from 'styled-components';
import { palette } from 'styled-theme';

const CompanyOwnerWrapper = styled.div`
  .white-box {
    padding: 0;
  }
  
  .topFieldWrapper {
    padding: 40px 40px 20px;
    border-bottom: 1px solid ${palette('border', 9)};
    
    .formGroup {
      margin-top: 40px;
    }
  }
  
  .bottomFieldWrapper {
    padding: 40px;
    
    .formGroup {
      margin-bottom: 0;
    }
  }

  .dividerWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .divider {
      height: 75px;
      border-left: 1px solid ${palette('border', 9)};
    }
    
    span {
      font-weight: bold;
      font-size: 15px;
      margin: 20px 0;
      color: ${palette('text', 5)};
    }
  }
  
  .actionBtnWrapper {
    text-align: center;
    margin-bottom: 40px;
  }  
`;

export default CompanyOwnerWrapper;
