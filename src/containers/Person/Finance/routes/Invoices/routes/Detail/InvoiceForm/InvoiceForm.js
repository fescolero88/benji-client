import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InvoiceFormWrapper from './InvoiceForm.style';
import RequestClarification from '../RequestClarification';
import {Col, Row} from 'antd';
import NumberFormat from 'react-number-format';
import BillForm from '../BillForm';
import Button from '@iso/components/uielements/button';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import MemoPriceTypes from '@iso/enums/memo_price_types';
import CalendarIcon from '@iso/components/icons/Calendar';
import DatePicker from '@iso/components/uielements/datePicker';
import PhoneText from '@iso/components/utility/phoneText';
import { displayDateFormat } from '@iso/config/datetime.config';
import { formatDateString, stringToDate } from '@iso/lib/helpers/utility';
import { updateContractorInvoiceRequest } from '@iso/redux/contractorInvoice/actions';
import _ from 'lodash';

const Option = SelectOption;

const DaySelector = ({value, minDay = 1, maxDay = 60, onSelect, ...rest}) => {
  return (
    <Select value={value} onSelect={onSelect} placeholder="Days" {...rest}>
      {_.range(minDay, maxDay + 1).map(day => (
        <Option key={day} value={day}>{day}</Option>
      ))}
    </Select>
  )
};

const InvoiceForm = ({invoice}) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { billFrom, billTo, invoiceMemo, lineItems: services } = invoice;
  const [billingEdit, setBillingEdit] = useState({visible: false, billing: null});
  const [requestClarification, setRequestClarification] = useState({visible: false});

  const handleRequestClarification = (type, data) => {
    setRequestClarification({visible: false});
  };

  const onRequestClarificationClick = () => {
    setRequestClarification({visible: true});
  };

  const handleBillingForm = (type, data) => {
    if (type === 'close') {
      setBillingEdit({visible: false, billing: null, type: ''});
    }
  };

  const onBillingEdit = (billing, type) => {
    setBillingEdit({visible: true, billing, type});
  };

  const handleInvoiceUpdate = (values) => {
    const payload = {...values};
    dispatch(updateContractorInvoiceRequest(authUser.id, invoice.id, payload))
  };

  return (
    <InvoiceFormWrapper>
      <div className="billingWrapper">
        <BillForm visible={billingEdit.visible} billing={billingEdit.billing} type={billingEdit.type} setModalData={handleBillingForm} />

        <div className="leftSideContent">
          <div className="billFrom">
            <h3 className="title">Bill From</h3>
            <p>{billFrom.name}</p>
            <p>
              {billFrom.address}
              <br />
              {billFrom.city}, {billFrom.state} {billFrom.zipCode}
            </p>
            <p>
              <PhoneText value={billFrom.phone} />
              <br />
              {billFrom.email}
            </p>
            <p>
              <Button type="link" onClick={() => onBillingEdit(billFrom, 'BILL_FROM')}>Edit</Button>
            </p>
          </div>
          <div className="billTo">
            <h3 className="title">Bill To</h3>
            <p>{billTo.name}</p>
            <p>
              {billTo.address}
              <br />
              {billTo.city}, {billTo.state} {billTo.zipCode}
            </p>
            <p>
              <PhoneText value={billTo.phone} />
              <br />
              {billTo.email}
            </p>
            <p>
              <Button type="link" onClick={() => onBillingEdit(billTo, 'BILL_TO')}>Edit</Button>
            </p>
          </div>
        </div>
        <div className="rightSideContent">
          <div className="formGroup">
            <label>Invoice Date</label>
            <DatePicker
              style={{width: '100%'}}
              format={displayDateFormat}
              value={stringToDate(invoice.invoiceDate)}
              suffixIcon={<CalendarIcon width={20} height={18} fill="#bcbccb"/>}
              onChange={date => {
                const invoiceDate = formatDateString(date);
                handleInvoiceUpdate({invoiceDate});
              }}
            />
          </div>
          <div className="formGroup">
            <label>Payment Due</label>
            <DatePicker
              style={{width: '100%'}}
              format={displayDateFormat}
              value={stringToDate(invoice.paymentDue)}
              suffixIcon={<CalendarIcon width={20} height={18} fill="#bcbccb"/>}
              onChange={date => {
                const paymentDue = formatDateString(date);
                handleInvoiceUpdate({paymentDue});
              }}
            />
          </div>

        </div>
      </div>
      <div className="memoWrapper">
        <RequestClarification visible={requestClarification.visible} setModalData={handleRequestClarification} />
        <h3 className="title">Deal Memo</h3>
        <div className="invoiceMemoInfo">
          <Row gutter={20} style={{flexWrap: 'nowrap'}} align="center">
            <Col flex="auto">
              <Row gutter={10} style={{flexWrap: 'nowrap'}}>
                <Col flex="auto">
                  <RadioGroup
                    className="priceTypeOption"
                    value={invoiceMemo.priceType}
                    disabled={true}
                  >
                    <Radio value={MemoPriceTypes.HOURLY} disabled={true}>
                      <span className="radioLabel">Day Rate</span>
                    </Radio>
                  </RadioGroup>
                  <InputGroup compact>
                    <DaySelector
                      style={{width: '40%'}}
                      disabled={true}
                      value={invoiceMemo.workingDays}
                    />
                    <NumberFormat
                      style={{width: '60%'}}
                      disabled={true}
                      value={invoiceMemo.workingRate || ''}
                      thousandSeparator={true}
                      prefix="$"
                      customInput={Input}
                    />
                  </InputGroup>
                </Col>
                <Col flex="auto">
                  <div className="formGroup">
                    <label className="fieldLabel">Hours Per Day</label>
                    <Input value={invoiceMemo.dailyHours || ''} disabled={true} />
                  </div>
                </Col>
                <Col flex="auto">
                  <RadioGroup
                    className="priceTypeOption"
                    value={invoiceMemo.priceType}
                  >
                    <Radio value={MemoPriceTypes.FIXED} disabled={true}>
                      <span className="radioLabel">Project Rate</span>
                    </Radio>
                  </RadioGroup>
                  <NumberFormat
                    disabled={true}
                    value={invoiceMemo.projectRate || ''}
                    thousandSeparator={true}
                    prefix="$"
                    customInput={Input}
                  />
                </Col>
                <Col flex="auto">
                  <label className="fieldLabel">Kit Fee - <i>Optional</i></label>
                  <NumberFormat
                    disabled={true}
                    value={invoiceMemo.kitFee || ''}
                    thousandSeparator={true}
                    prefix="$"
                    customInput={Input}
                  />
                </Col>
                <Col flex="auto">
                  <label className="fieldLabel">Notes</label>
                  <Input disabled={true} value={invoiceMemo.notes} />
                </Col>
              </Row>
            </Col>
            <Col flex="200px">
              <label className="fieldLabel">&nbsp;</label>
              <Button shape="round" type="warning" onClick={onRequestClarificationClick}>Request Clarification</Button>
            </Col>
          </Row>
        </div>
      </div>
    </InvoiceFormWrapper>
  );
};

export default InvoiceForm;
