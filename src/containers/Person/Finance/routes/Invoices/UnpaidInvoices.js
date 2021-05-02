import React from 'react';
import ContractorInvoiceCard from './components/InvoiceCard';
import { Col, Row } from 'antd';

const UnpaidInvoices = ({invoices, onOpen}) => {
  return (
    <Row gutter={[35, 30]}>
      {invoices.map(invoice => (
        <Col md={8} xs={12}>
          <ContractorInvoiceCard key={`unpaid-invoice-${invoice.id}`} invoice={invoice} onOpen={onOpen} />
        </Col>
      ))}
    </Row>
  );
};

export default UnpaidInvoices;
