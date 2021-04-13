import styled from 'styled-components';
import { palette } from 'styled-theme';

const InvoiceDepartmentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  
  .departmentListWrapper {
    width: 280px;
    flex-shrink: 0;
    
    .departmentList {
      background: none;
      
      .departmentPositionList {
        > .ant-menu-submenu-title {
          background: #ffffff;
          padding: 20px !important;
          line-height: 15px;
          font-weight: bold;
          color: ${palette('text', 5)};
          height: auto;
          margin: 0;
          border-right: 1px solid #e8e8f1;
          border-bottom: 1px solid #e8e8f1;
        }
      
        > .ant-menu {
          background: none;
          margin: 25px 0;
        }
        
        .ant-menu-sub {
          > .ant-menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px !important;
          }
        }
      }
    }
    
    .departmentName {
      margin: 0 20px;
      vertical-align: middle;
    }
    
    .positionName {
      margin-left: 20px;
      vertical-align: middle;
    }
  }
  
  .crewListWrapper {
    flex: auto;
  }
  
  .crewList {
    color: ${palette('text', 5)};
    
    .crewListHead {
      .crewHeadRow {
        border-bottom: 1px solid #e8e8f1;
        background: #ffffff;
        
        .crewHeadTitle {
          padding: 20px;       
          line-height: 18px;
          font-size: 15px;
          font-weight: bold;
          
        }
      }
    }   
    
    .crewListBody {
      margin: 25px 0;
      padding-left: 20px;
      &::before {
        display: table;
        content: ''
      }     
      
      .crewBodyRow {
        margin: 4px 0;
        height: 40px;
        
        .crewBodyData {          
          margin: 0;
          padding: 0 20px;
          display: flex;
          align-items: center;        
          
          &.groupData {
            background-color: #ffffff;
            border: solid 1px #e0e1e9;
            
            &.groupData.first {
              border-radius: 5px 0 0 5px;
            }
            
            &.groupData.last {
              border-radius: 0 5px 5px 0;              
            }
          }
          
          &.invoiceStatus {
            span {
              height: 34px;
              min-width: 115px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
  
`;

export default InvoiceDepartmentWrapper;
