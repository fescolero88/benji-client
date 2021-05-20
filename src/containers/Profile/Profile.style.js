import styled from 'styled-components';
import { palette } from "styled-theme";
import WithDirection from '@iso/lib/helpers/rtl';

const ProfileLayoutWrapper = styled.div`
  width: 100%;
  
  .fieldLabel {
    display: block;
    
    &.required::after {
      content: '*';
      color: ${palette('error', 0)};
    }
  }
  
  .helper-text {
    color: ${palette('error', 0)};
  }
  
  .section {
    margin-bottom: 40px;
    
    .sectionTitle {
      font-size: 18px;
      color: #333333;
      margin-bottom: 25px;
    }
    
    .sectionField {
      padding-left: 25px;
    }
  }
`;
export default WithDirection(ProfileLayoutWrapper);
