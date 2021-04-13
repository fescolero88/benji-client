import styled from 'styled-components';
import { palette } from 'styled-theme';

export const BookCrewWrapper = styled.div`
  .bookDate {
    font-size: 15px;
    color: ${palette('text', 5)};
    margin-bottom: 30px;
  }
`;

export const BookCrewHeader = styled.div`
  > .ant-row {
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
  }
  .ant-col {
    height: 40px;
    line-height: 40px;
    margin: 4px 0;
    font-size: 15px;
    padding: 0 10px;
    color: #2f2e50;
    &:first-child {
      padding-left: 0;
    }
  }

  .crewList {
    margin: 15px 0;
    .ant-row {
      border-radius: 5px;
      border: solid 1px #e0e1e9;
      background-color: #ffffff;
      margin: 5px 0;
      .ant-col {
        font-size: 15px;
        margin: 0;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        color: #2f2e50;

        &.boldText {
          font-weight: bold;
        }

        .ant-tag {
          border-radius: 10px;
        }
      }
    }
  }
`;
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin-left: 20px !important;
    svg {
      color: #51369a;
    }
  }
  button.ant-btn.ant-btn-circle {
    background: #f5f7fa;
    border: none;
    min-width: 10px;
  }
`;

export const BookInfoWrapper = styled.div`
  border: solid 1px #e8e8f1;
  border-radius: 10px;
  overflow: hidden;

  .bookInfoItem {
    position: relative;
    > span {
      background-color: #fff;
      border-bottom: solid 1px #e8e8f1;
      position: absolute;
      width: 100%;
      height: 48px;
      left: 0;
      top: 0;
    }
    .departmentList {
      .ant-menu-root.ant-menu-inline,
      .ant-menu-sub.ant-menu-inline {
        background: none;
      }
      .ant-menu-sub.ant-menu-inline {
        margin: 15px 0;
      }
      > ul > li {
        margin: 0;
      }
      li {
        text-align: right;

        .ant-menu-submenu-title {
          text-align: left;
          padding: 0 30px 0 20px !important;
          font-weight: bold;
          position: relative;

          .ant-menu-submenu-arrow {
            font-size: 0px;
            right: 10px;
            &:before {
              display: none;
            }
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              right: 0;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #000;
              visibility: visible;
              margin-top: -2px;
              transform: rotate(0deg) translateX(-2px);
            }
          }
        }
      }
      .ant-menu-submenu-open.ant-menu-submenu-inline
        > .ant-menu-submenu-title
        .ant-menu-submenu-arrow {
        transform: rotate(180deg) translateX(2px);
      }
    }
  }
  .roleChoice {
    padding: 0 20px;
  }

  .roleTitle {
    display: inline-block;
    width: 100%;
    .ant-checkbox-wrapper span.ant-checkbox {
      top: 11px;
      float: left;
      margin-left: 20px;
    }
    .ant-checkbox-wrapper span {
      padding-right: 0;
      font-size: 15px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const BookCrewJobDepartmentWrapper = styled.div`
  .ant-checkbox-wrapper {
    width: 100%;

    span {
      color: #2f2e50;
      &.ant-checkbox {
        margin-right: 10px;

        &:after {
          display: none;
        }
        .ant-checkbox-inner {
          width: 18px;
          height: 18px;
          background-color: transparent;
          border: solid 2px #d9d9e2;
        }
        &.ant-checkbox-checked {
          .ant-checkbox-inner {
            background-color: #51369a;
            border-color: transparent;
          }
        }
      }
    }
  }
`;
