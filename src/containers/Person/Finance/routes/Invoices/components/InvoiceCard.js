import React from 'react';
import ContractorInvoiceCardWrapper from './InvoiceCard.style';
import Button from '@iso/components/uielements/button';
import CurrencyText from '@iso/components/utility/currencyText';
import InvoiceStatus from './InvoiceStatus';
import { MoreOutlined } from '@ant-design/icons';
import { formatDateString } from '@iso/lib/helpers/utility';
import { displayDateFormat } from '@iso/config/datetime.config';
import {Dropdown, Menu} from 'antd';

const jobTextMargin = {
  marginLeft: '15px'
};

const ContractorInvoiceCard = ({invoice, onOpen}) => {
  const { job } = invoice;

  const handleOpen = () => {
    if (!invoice.canHandleInvoice) return;
    onOpen(invoice)
  };

  const MoreActions = (
    <Menu>
      <Menu.Item onClick={handleOpen}>
        Open
      </Menu.Item>
    </Menu>
  );

  return (
    <ContractorInvoiceCardWrapper onClick={handleOpen}>
      {invoice.canHandleInvoice && (
        <Dropdown overlay={MoreActions} overlayClassName="invoiceMenu" placement="bottomRight" trigger="click">
          <Button type="link" className="moreAction" onClick={(e) => e.stopPropagation()}><MoreOutlined /></Button>
        </Dropdown>
      )}
      <div className="invoiceHeader">
        <InvoiceStatus status={invoice.status} />
        <span className="timeAgo"></span>
      </div>
      <div className="invoiceBody">
        <div className="jobHeadText">
          <div className="jobTitle">{job.client}</div>
          <div>{job.title}</div>
        </div>
        <div className="jobText">
          <div className="blockText">
            <strong>Job ID#</strong><br/>{job.jobNumber}
          </div>
          <div className="blockText" style={jobTextMargin}>
            <strong>Agency</strong><br/>{job.agency}
          </div>
          <div className="blockText" style={jobTextMargin}>
            <strong>Shoot Dates</strong><br/>
            {job.shootDatesString}
          </div>
        </div>
      </div>
      <div className="invoiceFooter">
        <div className="totalPayLabel">
          <span><strong>Total</strong></span>
          <br />
          <span>Due {formatDateString(invoice.paymentDue, displayDateFormat)}</span>
        </div>
        {invoice.canHandleInvoice && (
          <div className="totalPayPrice">
            <CurrencyText value={invoice.totalPrice} />
          </div>
        )}
      </div>
    </ContractorInvoiceCardWrapper>
  );
};

export default ContractorInvoiceCard;
