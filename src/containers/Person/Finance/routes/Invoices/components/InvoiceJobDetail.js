import React, {useState} from "react";
import {useHistory} from 'react-router';
import InvoiceJobDetailWrapper from './InvoiceJobDetail.style';
import InvoiceStatus from './InvoiceStatus';
import CurrencyText from '@iso/components/utility/currencyText';

const InvoiceJobDetail = ({invoice}) => {
  const history = useHistory();
  const goBack = () => {
    history.push('../../jobs');
  };

  const { job } = invoice;

  return (
    <InvoiceJobDetailWrapper>
      <div className="header-top">
        <div className="header-left">
          <div className="header-title">
            <InvoiceStatus status={invoice.status} />
            <h1>{job.client}</h1>
            <p>{job.agency} | {job.title}</p>
          </div>
        </div>

        <div className="header-right">
          <div className="invoiceTotal">
            <label>Total Rate</label>
            <span className="totalAmount"><CurrencyText value={invoice.totalPrice} /></span>
          </div>
        </div>
      </div>
    </InvoiceJobDetailWrapper>
  );
};

export default InvoiceJobDetail;
