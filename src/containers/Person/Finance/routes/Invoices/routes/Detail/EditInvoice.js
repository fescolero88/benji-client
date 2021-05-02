import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch } from 'react-redux';
import { ContractorInvoiceEditWrapper } from './Detail.style';
import InvoiceForm from './InvoiceForm/InvoiceForm';
import InvoiceDocumentForm from './Document/Form';
import InvoiceDocumentList from './Document/List';
import InvoiceReceiptList from './Receipt/List';
import InvoiceReceiptForm from './Receipt/Form';
import ContractorInvoicePreview from '../../components/InvoicePreview';
import RadioSwitch from '../../components/Switch';
import CurrencyText from '@iso/components/utility/currencyText';
import {scroller} from 'react-scroll';
import { RadioButton } from '@iso/components/uielements/radio';
import Button from '@iso/components/uielements/button';
import DownloadIcon from '@iso/components/icons/Download';
import Box from '@iso/components/utility/box';
import InvoiceServiceForm from './ServiceForm/ServiceForm';


const ContractorInvoiceEdit = ({invoice, onSend}) => {
  const dispatch = useDispatch();
  const [invoiceEditMode, setInvoiceEditMode] = useState('Edit');

  const totalServicePrice  = useMemo(() => {
    let total = 0;
    total += parseFloat(invoice.invoiceMemo.invoiceAmount);
    total += invoice.lineItems.reduce((sum, a) => sum += parseFloat(a.totalAmount), 0);
    return total;
  }, [invoice]);

  const totalReceiptPrice  = useMemo(() => {
    let total = 0;
    total += invoice.receipts.reduce((sum, a) => sum += parseFloat(a.amount), 0);
    return total;
  }, [invoice]);

  const onInvoicePreview = () => {
    scroller.scrollTo('invoicePreview', {smooth: true, containerId: 'isoContentMainLayout'});
  };
  const onPreviewEdit = () => {
    scroller.scrollTo('invoiceForm', {smooth: true, containerId: 'isoContentMainLayout'});
  };

  const handleInvoiceSend = () => {
    onSend();
  };

  const { receipts } = invoice;

  return (
    <ContractorInvoiceEditWrapper>
      <Box className="invoiceForm" id="invoiceForm">
        <div className="invoiceFormHeader">
          <div className="leftSideAction">
            <RadioSwitch value={invoiceEditMode}>
              <RadioButton value="Edit" onClick={() => setInvoiceEditMode('Edit')}>Edit Invoice</RadioButton>
              <RadioButton value="Upload" onClick={() => setInvoiceEditMode('Upload')}>Upload Invoice</RadioButton>
            </RadioSwitch>
          </div>
          <div className="rightSideAction">
            <Button shape="round" onClick={onInvoicePreview}>Preview</Button>
            <div className="totalPrice">
              <label>Total</label>
              <CurrencyText value={totalServicePrice} />
            </div>
          </div>
        </div>
        <div className="invoiceFormBody">
          {invoiceEditMode === 'Edit' ? <InvoiceForm invoice={invoice} /> : <InvoiceDocumentForm invoice={invoice} />}

          {invoiceEditMode === 'Upload' &&
            <div className="documentListWrapper">
              <InvoiceDocumentList invoice={invoice} documents={invoice.documents} />
            </div>
          }
          <div className="serviceWrapper">
            <h3 className="title">Services</h3>
            <div className="serviceForm">
              <InvoiceServiceForm invoice={invoice} />
            </div>
          </div>
        </div>
      </Box>
      <Box className="receiptForm">
        <div className="receiptFormHeader">
          <h3 className="title">Receipts</h3>
          <div className="totalPrice">
            <label>Total</label>
            <CurrencyText value={totalReceiptPrice} />
          </div>
        </div>
        <div className="receiptFormBody">
          <div className="uploadFormWrapper">
            <InvoiceReceiptForm invoice={invoice} />
          </div>

          <div className="receiptListWrapper">
            <InvoiceReceiptList invoice={invoice} receipts={receipts} />
          </div>
        </div>
      </Box>

      <div className="editButtonWrapper">
        <div className="totalInvoice">
          <label>Total Invoice:</label>
          <CurrencyText value={totalServicePrice + totalReceiptPrice} />
        </div>
        <Button shape="round" type="primary" onClick={handleInvoiceSend}>Send Invoice</Button>
      </div>

      {invoiceEditMode === 'Edit' && (
        <Box className="invoicePreview" id="invoicePreview">
          <div className="invoicePreviewHeader">
            <h3 className="title">Preview Mode</h3>
            <div className="actions">
              <Button shape="round" type="primary" onClick={handleInvoiceSend}>Send Invoice</Button>
              <Button shape="round" onClick={onPreviewEdit}>Edit</Button>
              <Button shape="circle" icon={<DownloadIcon width={18} height={18} stroke="#2f2e50" />} />
            </div>
          </div>
          <div className="invoicePreviewBody">
            <ContractorInvoicePreview invoice={invoice} />
          </div>
        </Box>
      )}
    </ContractorInvoiceEditWrapper>
  );
};

export default ContractorInvoiceEdit;
