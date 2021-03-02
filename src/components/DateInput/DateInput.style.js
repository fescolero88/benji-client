import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '@iso/lib/helpers/style_utils';

const DateInputWrapper = styled.div`
.ant-input {
    padding: 4px 10px;
    width: 100%;
    height: 35px;
    cursor: text;
    font-size: 13px;
    line-height: 1.5;
    color: ${palette('text', 1)};
    background-color: #fff;
    background-image: none;
    border: 1px solid ${palette('border', 0)};
    ${borderRadius(0)};
    ${transition()};
  }
`;

export default DateInputWrapper;
