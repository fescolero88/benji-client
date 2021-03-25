import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '@iso/lib/helpers/rtl';

const CompanyProfileStyleWrapper = styled.div`
  .actionBtnWrapper {
    text-align: center;
  }
`;

export default WithDirection(CompanyProfileStyleWrapper);
