import styled from 'styled-components';
import { grid } from '@iso/assets/styles/constants';

export const Container = styled.div`
  box-sizing: border-box;
  margin: 0 ${grid}px;
  display: flex;
  width: calc(33.33% - ${grid}px);
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5f7fa;
  flex-direction: column;
  border-top: ${({ color }) => `solid 10px ${color}`};
  padding: 0 20px 20px;
  
  &:last-child {
    margin-right: 0;
  }
  &:first-child {
    margin-left: 0;
  }
  .ant-form {
    margin-top: 14px;
  }
  .ant-form-item {
    margin-bottom: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 20px 0;  
  background-color: ${({ isDragging }) =>
    isDragging ? '#e6eaf8' : 'transparent'};
  transition: background-color 0.1s ease;  
`;
