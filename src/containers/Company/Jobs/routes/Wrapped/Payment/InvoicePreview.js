import React, { useEffect, useState, createRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { Textarea } from '@iso/components/uielements/input';
import CurrencyText from '@iso/components/utility/currencyText';
import PhoneText from '@iso/components/utility/phoneText';
import MemoPriceTypes from '@iso/enums/memo_price_types';
import StyledModal, { InvoicePreviewContentWrapper } from './InvoicePreview.style';
import Logo from '@iso/assets/images/logo_invoice_footer.svg';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import MultiplyIcon from '@iso/components/icons/Multiply';
import DownloadIcon from '@iso/components/icons/Download';
import IntlMessages from '@iso/components/utility/intlMessages';
import Loader from '@iso/components/utility/loader';
import InvoiceProducerStatus from '@iso/enums/invoice_producer_status';
import { formatDateString, base64Image } from '@iso/lib/helpers/utility';
import { displayDateFormat } from '@iso/config/datetime.config';
import { fetchInvoiceByMemoRequest, updateInvoiceRequest } from '@iso/redux/jobInvoice/actions';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Option = SelectOption;

const InvoicePreview = ({ job, invoiceMemo, setModalData }) => {
  const dispatch = useDispatch();
  const { invoice, fetchInvoiceByMemo, updateInvoice } = useSelector(state => state.JobInvoice);
  const [showLoader, setShowLoader] = useState(true);
  const [action, setAction] = useState('');
  const invoicePrintArea = createRef();

  useEffect(() => {
    setAction('fetch_invoice_detail');
    dispatch(fetchInvoiceByMemoRequest(job.id, invoiceMemo.id));
  }, [invoiceMemo]);

  useEffect(() => {
    if (!fetchInvoiceByMemo.loading && !fetchInvoiceByMemo.error && action === 'fetch_invoice_detail') {
      setShowLoader(false);
    }

    if (!fetchInvoiceByMemo.loading && action === 'fetch_invoice_detail') {
      setAction('');
    }
  }, [fetchInvoiceByMemo]);

  useEffect(() => {
    if (!updateInvoice.loading && !updateInvoice.error && action === 'update_invoice') {
      setModalData('close');
    }

    if (!updateInvoice.loading && action === 'update_invoice') {
      setAction('');
    }
  }, [updateInvoice]);

  const canEdit = useMemo(() => {
    return invoice && invoice.status !== InvoiceProducerStatus.PAYMENT_SENT
  }, [invoice]);

  const handleCancel = () => {
    setModalData('close');
  };

  const handleInvoiceStatus = (values) => {
    setAction('update_invoice');
    const payload = { ...values };
    dispatch(updateInvoiceRequest(job.id, invoice.id, payload));
  };

  const handleDownloadInvoice = async () => {
    if (!invoicePrintArea.current) return;
    setAction('download');
    const canvas = await html2canvas(invoicePrintArea.current, {
      allowTaint: true,
      useCORS: true,
      onclone: async (cloned) => {
        const downloadBtn = cloned.getElementById('download-btn');
        downloadBtn.style.display = 'none';
        const benjiPoweredBy = cloned.getElementById('benji-powered');
        benjiPoweredBy.classList.replace('ant-col-md-16', 'ant-col-md-24')
        const images = cloned.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
          images[i].src = await base64Image(images[i].src);
        }
      }
    });
    const imgData = canvas.toDataURL('image/jpeg');
    let pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height], hotfixes: ['px_scaling'] });
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save('invoice.pdf');
    setAction('');
  };

  if (showLoader) {
    return <Loader />
  }

  const { billFrom, billTo, lineItems, receipts } = invoice;

  return (
    <StyledModal
      visible={true}
      width={1200}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <InvoicePreviewContentWrapper gutter={[0, 9]} justify="start" >
        <Col className="invoice-content-wrapper" md={canEdit ? 18 : 24} ref={invoicePrintArea}>
          <div className="invoice-content">
            <Row className="invoice-content-header">
              <Col className="invoice-content-header-title" md={16}><p>Invoice</p></Col>
              <Col className="invoice-content-header-sender" md={8} style={{ textAlign: 'right' }}>
                <p>
                  <strong>{billTo.name}</strong>
                </p>
                <br />
                <p>
                  <span>{billTo.address}</span>
                  <br />
                  <span>{billTo.city}, {billTo.state} {billTo.zipCode}</span>
                </p>
                <br />
                <p>
                  <PhoneText value={billTo.phone} />
                  <br />
                  {billTo.email}
                </p>

              </Col>
            </Row>
            <Row className="invoice-content-info">
              <Col className="invoice-content-info-recipient" md={16}>
                <p>
                  <strong>Bill To</strong>
                </p>
                <br />
                <p>
                  <strong>{billFrom.name}</strong>
                </p>
                <br />
                <p>
                  <span>{billTo.address}</span>
                  <br />
                  <span>{billTo.city}, {billTo.state} {billTo.zipCode}</span>
                </p>
                <br />
                <p>
                  <PhoneText value={billTo.phone} />
                  <br />
                  <span>{billTo.email}</span>
                </p>
              </Col>
              <Col className="invoice-content-info-invoice-data" md={8}>
                <Row>
                  <Col md={10}><strong>Invoice Number:</strong></Col>
                  <Col md={14}><span>{invoice.invoiceNumber}</span></Col>
                </Row>
                <Row>
                  <Col md={10}><strong>Invoice Date:</strong></Col>
                  <Col md={14}><span>{formatDateString(invoice.invoiceDate, displayDateFormat)}</span></Col>
                </Row>
                <Row>
                  <Col md={10}><strong>Payment Due:</strong></Col>
                  <Col md={14}><span>{formatDateString(invoice.paymentDue, displayDateFormat)}</span></Col>
                </Row>
                <br />
                <Row className="amount-due">
                  <Col md={12}><strong>Amount Due:</strong></Col>
                  <Col md={12}>
                    <CurrencyText value={invoice.totalPrice} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className="ant-table">
                <table className="services">
                  <thead className="ant-table-thead">
                    <tr>
                      <th></th>
                      <th>Services</th>
                      <th>Units</th>
                      <th>No. of Days</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    <tr>
                      <td></td>
                      <td>Producer Fee</td>
                      <td>1</td>
                      <td>{invoiceMemo.shootDates.length}</td>
                      <td>{invoiceMemo.priceType === MemoPriceTypes.HOURLY ? invoiceMemo.projectRate : 0}</td>
                      <td><CurrencyText value={invoiceMemo.invoiceAmount} /></td>
                      <td></td>
                    </tr>
                    {lineItems.map(item => (
                      <tr key={`service-${item.id}`}>
                        <td></td>
                        <td>Custom Fee</td>
                        <td>{item.units}</td>
                        <td>{item.numberOfDays}</td>
                        <td>{item.rate}</td>
                        <td><CurrencyText value={item.totalAmount} /></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="receipt">
                  <thead className="ant-table-thead">
                    <tr>
                      <th></th>
                      <th>Receipt</th>
                      <th>Date</th>
                      <th>Notes</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {receipts.map(receipt => (
                      <tr key={`receipt-${receipt.id}`}>
                        <td></td>
                        <td>{receipt.title}</td>
                        <td>{formatDateString(receipt.paymentDue, displayDateFormat)}</td>
                        <td>{receipt.notes}</td>
                        <td><CurrencyText value={receipt.amount} /></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Row>
            <Row className="invoice-content-amount" justify="end">
              <Col md={8}>
                <Row>
                  <Col md={10}><strong>Services Total:</strong></Col>
                  <Col md={14}><CurrencyText value={invoice.serviceTotal} /></Col>
                </Row>
                <Row>
                  <Col md={10}><strong>Receipt Total:</strong></Col>
                  <Col md={14}><CurrencyText value={invoice.receiptTotal} /></Col>
                </Row>
              </Col>
            </Row>
            <Row className="invoice-content-notes">
              <Col className="invoice-content-notes-text" md={16}>
                <strong>Notes:</strong>
                <br />
                <p>
                  All amounts are in dollars. Please make the payment within 15 days from the issue of date of this invoice.&nbsp;
                  Tax is not charged on the basis of paragraph 1 of Article 94 of the Value Added Tax Act (I am not liable for VAT).
                </p>
              </Col>
              <Col className="invoice-content-notes-amount-due" md={8}>
                <div>
                  <p className="notes-amount">
                    <strong><CurrencyText value={invoice.totalPrice} /></strong>
                  </p>
                  <p className="notes-amount-due-label">
                    <strong>Amount Due</strong>
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="invoice-preview-footer">
              <Col md={24} id="benji-powered">
                <p style={{ textAlign: 'center' }}>
                  <span>Powered by</span>&nbsp;&nbsp;&nbsp;
                  <img src={Logo} height={20} />
                </p>
              </Col>
            </Row>
          </div>
          <Button
            shape="circle"
            className="downloadBtn"
            icon={<DownloadIcon width={18} height={18} stroke="#2f2e50" />}
            loading={action === 'download'}
            onClick={handleDownloadInvoice}
          />
        </Col>

        {canEdit && (
          <Col className="invoice-status-and-actions" md={6}>
            <div className="invoice-actions-header">
              <div className="title">Change Invoice Status</div>
              <Button type="link" icon={<MultiplyIcon width={14} height={14} />} onClick={handleCancel} />
            </div>
            <div className="invoice-actions-content">
              <Formik
                enableReinitialize
                initialValues={{
                  invoiceStatus: 'Approved',
                  reason: ''
                }}
                onSubmit={handleInvoiceStatus}
              >
                {({ values, setFieldValue, touched, errors }) => (
                  <Form>
                    <Row>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        value={values.invoiceStatus}
                        onChange={(value) => {
                          setFieldValue('invoiceStatus', value);
                        }}
                      >
                        <Option key="1" value="Approved">Approve & Pay</Option>
                        <Option key="2" value="Disapprove">Disapprove</Option>
                      </Select>

                    </Row>
                    <Row className="invoice-status-reason">
                      <Col span={24}>
                        <label className="fieldLabel">Reason</label>
                        <Textarea
                          rows={3}
                          placeholder="receipt issues"
                          onChange={e => setFieldValue('reason', e.target.value)}
                        /></Col>
                    </Row>
                    <Row>
                      <Col md={24}>
                        <Button
                          shape="round"
                          type="primary"
                          htmlType="submit"
                        >
                          <IntlMessages id="page.confirm" />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>

            </div>
          </Col>
        )}
      </InvoicePreviewContentWrapper>
    </StyledModal>
  )
};

export default InvoicePreview;
