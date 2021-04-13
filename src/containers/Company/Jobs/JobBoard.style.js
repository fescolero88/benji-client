import styled from "styled-components";
import { palette } from 'styled-theme';

const JobBoardLayout = styled.div`
  background: #ffffff;
  padding: 35px 40px;
  width: 100%;
  height: 100%;
`;

export const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

/* like display:flex but will allow bleeding over the window width */
export const Container = styled.div`
  min-width: 100%;
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
`;

export const JobHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 30px;
  h1 {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    
    .ant-badge {
      margin-left: 20px;
    }
  }
`;

export const JobHeaderAction = styled.div`
  margin-left: auto;
  button.ant-btn {
    border-radius: 50px;
    margin-left: 20px;
  }
  .archivedBtn {
    background-color: #f5f7fa;
    border-color: #f5f7fa;
    color: #2f2e50;
    &:hover {
      background-color: #e3eaf4;
      border-color: #e3eaf4;
      color: #2f2e50;
    }
  }
`;

export default JobBoardLayout;
