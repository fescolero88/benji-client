import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ContractorInvoiceDetailWrapper from './Detail.style';
import InvoiceJobDetail from '../../components/InvoiceJobDetail';
import ContractorInvoiceEdit from './EditInvoice';
import ContractorInvoiceView from './ViewInvoice';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import BackIcon from '@iso/components/icons/Back';
import {LoadingOutlined} from '@ant-design/icons';
import useOnClickOutside from '@iso/lib/hooks/useOnClickOutside';
import notify from '@iso/lib/helpers/notify';
import { showServerError } from '@iso/lib/helpers/utility';
import { setContractorInvoiceNumberRequest, sendContractorInvoiceRequest } from '@iso/redux/contractorInvoice/actions';
import _ from 'lodash';

const ContractorInvoiceDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { invoice, setInvoiceNumberAction, send } = useSelector(state => state.ContractorInvoice);
  const [viewMode, setViewMode] = useState('View');
  const [editableInvoiceNumber, setEditableInvoiceNumber] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [action, setAction] = useState('');

  const ref = useRef();

  useEffect(() => {
    if (!setInvoiceNumberAction.loading && !setInvoiceNumberAction.error && action === 'update_invoice_number') {
      setEditableInvoiceNumber(false);
    }

    if (setInvoiceNumberAction.error && action === 'update_invoice_number') {
      notify('error', showServerError(setInvoiceNumberAction.error));
    }

    if (!setInvoiceNumberAction.loading && action === 'update_invoice_number') {
      setAction('');
    }
  }, [setInvoiceNumberAction]);

  useEffect(() => {
    if (!send.loading && !send.error && action === 'send_invoice') {
      setViewMode('View');
      notify('success', 'Invoice sent successfully.');
    }

    if (send.error && action === 'send_invoice') {
      notify('error', showServerError(send.error));
    }

    if (!send.loading && action === 'send_invoice') {
      setAction('');
    }
  }, [send]);

  useEffect(() => {
    setInvoiceNumber(invoice.invoiceNumber);
  }, [invoice]);

  useOnClickOutside(ref, () => {
    setEditableInvoiceNumber(false);
  });

  const goBack = () => {
    history.push('../../invoices');
  };

  const onInvoiceEdit = () => {
    setViewMode('Edit');
  };

  const onInvoiceSend = () => {
    setAction('send_invoice');
    dispatch(sendContractorInvoiceRequest(authUser.id, invoice.id));
  };

  const onInvoiceNumberEdit = () => {
    setEditableInvoiceNumber(true);
  };

  const onInvoiceNumberDone = () => {
    setAction('update_invoice_number');
    dispatch(setContractorInvoiceNumberRequest(authUser.id, invoice.id, {invoiceNumber: invoiceNumber}));
  };

  return (
    <ContractorInvoiceDetailWrapper>
      <div className="PageHeader">
        <div className="invoiceNumberWrapper">
          {editableInvoiceNumber ? (
            <div className="invoiceNumberEditor" ref={ref}>
              <Input
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
                onPressEnter={onInvoiceNumberDone}
                suffix={
                  action === 'update_invoice_number' && setInvoiceNumberAction.loading ? <LoadingOutlined /> : null
                }
              />
            </div>
          ) : <div className="invoiceNumber">Invoice No: {invoiceNumber}</div>
          }
          <Button type="link" onClick={onInvoiceNumberEdit}>Edit</Button>
        </div>
        <div className="jobInfoWrapper">
          <Button type="link" className="goBackBtn" onClick={goBack}><BackIcon /></Button>
          <InvoiceJobDetail invoice={invoice} />
        </div>
      </div>
      <div className="divider" />
      <div className="PageSubHeader">
        <div className="inlineTextBlock">
          <label>Job #</label>
          <span>{invoice.job.jobNumber}</span>
        </div>
        <div className="">
          <label>Date(s):</label>
          <span>{invoice.job.shootDatesString}</span>
        </div>
      </div>
      <div className="divider" />
      <div className="PageContent">
        {viewMode === 'View' ? <ContractorInvoiceView invoice={invoice} onEdit={onInvoiceEdit} /> : <ContractorInvoiceEdit invoice={invoice} onSend={onInvoiceSend} />}
      </div>
    </ContractorInvoiceDetailWrapper>
  );
};

export default ContractorInvoiceDetail;
