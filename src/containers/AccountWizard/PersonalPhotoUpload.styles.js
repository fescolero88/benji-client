import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";

const PersonalPhotoUploadStyleWrapper = styled.div`
  padding: 0 50px;
  
  .white-box {
    padding: 35px 90px;
    
    h2 {
      margin-bottom: 45px;
    }
  }
  
  .uploadWrapper {
    width: 100%;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f7;
    border-radius: 10px;
    margin-bottom: 50px;
  }
  
  .btnWrapper {
    text-align: center;
    
    button {
      margin-left: 25px;
    }
  }
`;

export default WithDirection(PersonalPhotoUploadStyleWrapper);
