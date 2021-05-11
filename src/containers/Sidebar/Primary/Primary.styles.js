import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';

const PrimarySidebarWrapper = styled.div`
  .isoPrimarySidebar {    
    background: ${palette('background', 2)};
    width: 58px;
    height: 100%;
    flex: 0 0 58px;
    z-index: 1000;
    
    .isoCompanyMenu {
      padding: 0;
      background: transparent;
      border: none;
      padding: 22px 0 0 0;
      
      .ant-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0 0 28px 0;
        background-color: transparent;
        height: 45px;
        
        &:after {
          border-right: none;
        }
        
        &.ant-menu-item-selected {
          .isoCompanyLogoWrapper, .isoPersonalPhotoWrapper {
            border: 1px solid #a3a0fb;
          }
        }
      }
      
      .isoCompanyLogoWrapper, .isoPersonalPhotoWrapper {
        border-radius: 5px;        
        background: #5c4da0;
        padding: 4px;
        display: flex;
        
        img {
          border-radius: 5px;
        }
        
        .companyTitle {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #a3a0fb;
          font-weight: bold;
        }
      }
    }
    
    .addCompanyBtnWrapper {
      text-align: center;
     
      .companyAddBtn {
        width: 35px;
        height: 35px;
        color: #a3a0fb;
        
        .anticon {
          margin: 0;
          font-size: 16px;
        }
      }
    }    
  }  
`;

const CompanyPlusMenuWrapper = styled.div`
  margin: -12px -16px;
  
  &.isoCompanyPlusDropdown {
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    
    .isoDropdownLink {
      padding: 8px 12px;
      background: transparent;
      text-decoration: none;
      color: ${palette('text', 5)};
      
      &:hover {
        background: #f5f7fa;
      }
    }
  }  
`;

export { CompanyPlusMenuWrapper };

export default WithDirection(PrimarySidebarWrapper);
