import React from 'react';
import StatusTag from '@iso/components/utility/statusTag';
import InvoiceProducerStatus from '@iso/enums/invoice_producer_status';

const InvoiceProducerStatusColor = {
  [InvoiceProducerStatus.REQUESTED]: '#bcbccb',
  [InvoiceProducerStatus.IN_DISPUTE]: '#ffa177',
  [InvoiceProducerStatus.APPROVED]: '#19913d',
  [InvoiceProducerStatus.RECEIVED]: '#808bff',
  [InvoiceProducerStatus.PAYMENT_SENT]: ''
};

const InvoiceStatus = ({status}) => {
  switch (status) {
    case InvoiceProducerStatus.REQUESTED:
      return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.REQUESTED]}>Requested</StatusTag>;
    case InvoiceProducerStatus.PAYMENT_SENT:
      return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.PAYMENT_SENT]}>Paid</StatusTag>;
    case InvoiceProducerStatus.APPROVED:
      return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.APPROVED]}>Approved</StatusTag>;
    case InvoiceProducerStatus.RECEIVED:
      return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.RECEIVED]}>Sent</StatusTag>;
    case InvoiceProducerStatus.IN_DISPUTE:
      return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.IN_DISPUTE]}>In Dispute</StatusTag>;
    default:
      return null;
  }
};

export default InvoiceStatus;