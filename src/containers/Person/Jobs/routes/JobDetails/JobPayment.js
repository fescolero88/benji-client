import React from 'react';
import ContractorJobPaymentWrapper from './JobPayment.style';
import CurrencyText from '@iso/components/utility/currencyText';

const ContractorJobPayment = ({ job }) => {
  return (
    <ContractorJobPaymentWrapper>
      <div className="paymentInfos">
        <div className="paymentInfoLabel">Pay Terms:</div>
        <div className="paymentInfoDetails">NET - {job.payTerms}</div>
      </div>
      <div className="paymentInfos">
        <div className="paymentInfoLabel">Hours Per Day:</div>
        <div className="paymentInfoDetails">{job.dailyHours}</div>
      </div>
      <div className="paymentInfos">
        <div className="paymentInfoLabel">Daily Rate:</div>
        <div className="paymentInfoDetails"><CurrencyText value={job.workingRate} /></div>
      </div>
      <div className="totalPayWrapper">
        <div className="totalPayLabel">Total Pay:</div>
        <div className="totalPayAmount"><CurrencyText value={job.totalPrice} /></div>
      </div>
    </ContractorJobPaymentWrapper>
  );
};

export default ContractorJobPayment;
