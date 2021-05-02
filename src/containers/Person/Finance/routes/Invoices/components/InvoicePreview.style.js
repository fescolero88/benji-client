import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Row } from 'antd';

const ContractorInvoicePreviewWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  margin: 0 !important;

  .invoice-status-and-actions {
    background: white;
    border-left: 1px #e0e0e0;
  }

  .invoice-content-wrapper {
    padding: 46px 44px !important;
  }

  .invoice-content {
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;

    .invoice-content-header {
      font-family: OpenSans;
      color: #ffffff;

      .invoice-content-header-title {
        padding: 60px 39px;
        font-size: 30px;
        font-weight: bold;
        background-color: #5c4da0;
      }

      .invoice-content-header-sender {
        padding: 34px 40px;
        font-size: 10px;
        background-color: #51369a;
      }
    }

    .invoice-content-info {
      font-size: 10px;
      font-family: OpenSans;
      color: #2f2e50;

      .invoice-content-info-recipient {
        padding: 20px 38px;
      }

      .invoice-content-info-invoice-data {
        padding: 20px 0;
        .ant-row {
          line-height: 25px;

          .ant-col-md-10 {
            text-align: right;
          }

          &.amount-due {
            padding: 10px 32px;
            background-color: #f0f0f7;
            border-radius: 5px 0 0 5px;
          }
        }

        span {
          text-align: left;
          padding-left: 17px;
        }
      }
    }

    .invoice-content-amount {
      padding: 24px 0;
      font-size: 10px;
      font-family: OpenSans;
      color: #2f2e50;

      .ant-row {
        line-height: 25px;

        .ant-col-md-10 {
          text-align: right;
        }

        span {
          text-align: left;
          padding-left: 17px;
        }
      }
    }

    .invoice-content-notes {
      .invoice-content-notes-text {
        padding: 17px 38px;
        font-size: 10px;
        color: #2f2e50;
        background-color: #f0f0f7;
      }

      .invoice-content-notes-amount-due {
        padding: 32px;
        background-color: #5c4da0;
        color: #fff;

        .notes-amount {
          font-size: 26px;
          text-align: center;
        }

        .notes-amount-due-label {
          font-size: 10px;
          text-align: center;
        }
      }
    }

    .invoice-preview-footer {
      text-align: center;
      padding: 25px;

      font-size: 9px;
      color: #2f2e50;

      p {
        margin: auto;
      }
    }

    .ant-table {
      width: 100%;
      font-family: OpenSans;
      font-size: 10px;

      thead {
        padding: 0 9px 10px 38px;
        background-color: #2f2e50;
        th {
          background-color: #2f2e50;
          font-weight: bold;

          &:first-child {
            width: 38px;
          }

          &:last-child {
            width: 52px;
          }
        }
      }
      tbody {
        td {
          &:first-child {
            border: none;
          }
          &:last-child {
            border: none;
          }
        }
      }

      .services {
        thead {
          background-color: #2f2e50;
          th {
            background-color: #2f2e50;
            color: #fff;
          }
        }
      }

      .receipt {
        margin-top: 26px;
        thead {
          background-color: #f0f0f7;

          th {
            background-color: #f0f0f7;
            color: #2f2e50;
          }
        }
      }
    }
  }

  .invoice-status-and-actions {
    .invoice-actions-header {
      padding: 36px 20px;
      font-size: 15px;
      text-align: left;
      color: #2f2e50;
      border-bottom: 1px #e0e0e0 solid;
    }

    .invoice-actions-content {
      padding: 20px;
      
      .ant-select-selector {
        font-size: 14px;
        text-align: left;
        color: #333333;
      }

      .invoice-status-reason {
        font-family: OpenSans;
        font-size: 14px;
        

        label {
          color: #333333;
        }

        textarea {
          border-radius: 2px;
          border: solid 1px #bdbdbd;
          background-color: #f2f2f2;
          resize: none;
          min-height: 96px;
        }
      }

      button {
        width: 100%;
      }
  
      .ant-row {
        margin-bottom: 20px;
      }
    }
  }
`;

export default ContractorInvoicePreviewWrapper;
