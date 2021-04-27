import React from 'react';
import HoldMemoHelperTextWrapper from './HoldMemoHelperText.style';
import {CloseCircleFilled} from '@ant-design/icons';

const HoldMemoHelperText = ({onClose}) => {
  return (
    <HoldMemoHelperTextWrapper>
      <div className="stepBox stepBoxFirst">Steps to follow:</div>
      <div className="stepBox stepBoxBorder">
        <strong>1</strong>
        <span>Review your hold memo.</span>
      </div>
      <div className="stepBox stepBoxBorder">
        <strong>2</strong>
        <span>
          Click the desired hold status (1st, 2nd or 3rd hold) OR kindly
          decline.
        </span>
      </div>
      <div className="stepBox">
        <strong>3</strong>
        <span>
          Feel free to enter an optional message to the producer.
        </span>
      </div>
      <div
        className="stepBox stepBoxLast"
        style={{ backgroundColor: '#322d72' }}
      >
        <strong>!</strong>
        <span>
          Hold memo is valid until the producer releases the hold. If
          you would wish to cancel your hold, please contact the
          producer using the messages area.
        </span>
        <a onClick={onClose}>
          <CloseCircleFilled />
        </a>
      </div>
    </HoldMemoHelperTextWrapper>
  );
};

export default HoldMemoHelperText
