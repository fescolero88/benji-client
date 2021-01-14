import { createGlobalStyle } from 'styled-components';
import { palette, font } from 'styled-theme';
import 'antd/dist/antd.css';

const GlobalStyles = createGlobalStyle`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }
  
  .ant-modal-mask {
    background: rgba(47, 46, 80, 0.8) !important;
  }
  
  .ant-modal-wrap {
    &.hCentered {
      margin-left: 318px;
    }
  }

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
  }

  .ant-row.ant-form-item {
    margin-bottom: 5px;
  }

  .has-success.has-feedback {
    .ant-select {
      .ant-select-selection {
        .ant-select-selection__rendered {
          .ant-select-selection__placeholder {
            display: none !important;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for project category menu [ScrumBoard]
  /*-----------------------------------------------*/
  .project-category {
    .ant-select-dropdown-menu {
      .ant-select-dropdown-menu-item {
        padding: 8px 12px;
        color: #000000;
        font-family: 'Roboto';
        font-weight: 400;
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for project menu [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-dropdown {
    &.project-menu {
      width: 280px;
      top: 133px !important;
      
      .ant-dropdown-menu {
        padding: 0;
        overflow: hidden;

        .ant-dropdown-menu-item {
          min-height: 54px;
          line-height: auto;
          display: flex;
          align-items: center;
          padding: 10px 20px;

          &:first-child {
            padding: 0;
            border-bottom: 1px solid #f4f6fd;

            &:hover,
            &:focus {
              background-color: #ffffff;
            }
          }

          &:hover,
          &:focus {
            background-color: #F3F5FD;
          }

          &:last-child {
            background-color: #E6EAF8;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for popover [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-popover {
    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      .ant-checkbox-group-item {
        margin: 5px 0;
        span {
          font-size: 14px;
          color: #788195;
          text-transform: capitalize;
        }
      }
    }
  }

  /*-----------------------------------------------*/ 
  // style for modal [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-modal-wrap {
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .render-form-wrapper {
            padding: 10px;
            h2 {
              margin: 0;
            }
            form {
              padding: 15px 0 3px;
              .field-container {
                margin-bottom: 26px;
              }
            }
          }
        }
      }
    }
  }


/*-----------------------------------------------*/ 
  // style form previous GlobalStyles
  /*-----------------------------------------------*/

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
}

body {
  font-family: ${font('primary', 0)};
}

h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
li,
input,
textarea,
span,
div,
img,
svg {
  &::selection {
    background: ${palette('primary', 0)};
    color: #fff;
  }
}

.ant-row:not(.ant-form-item) {
  ${'' /* margin-left: -8px;
  margin-right: -8px; */};
  &:before,
  &:after {
    display: none;
  }
}

.ant-row > div {
  padding: 0;
}

.isoLeftRightComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.isoCenterComponent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
  content: unset !important;
}

.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}

.formGroup {
  margin-bottom: 20px;  
}

.fieldLabel {
  color: #868698;
  font-size: 13px;
  display: block;
  margin-bottom: 10px;
  
  i {
    font-size: 12px;
  }
}

.text-center {
  text-align: center;
}

.helper-text {
  color: ${palette('error', 0)};
}
`;

export default GlobalStyles;
