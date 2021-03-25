import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";

const PersonalProfileStyleWrapper = styled.div`
  .actionBtnWrapper {
    text-align: center;
    
    button {
      margin: 0 15px;
    }
  }
`;

export default WithDirection(PersonalProfileStyleWrapper);
