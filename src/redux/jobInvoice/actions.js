import * as CONSTANTS from './constants';

export const fetchJobDealMemosRequest = (jobId) => ({
  type: CONSTANTS.FETCH_JOB_DEAL_MEMOS_REQUEST,
  jobId
});

export const fetchJobDealMemosSuccess = (data) => ({
  type: CONSTANTS.FETCH_JOB_DEAL_MEMOS_SUCCESS,
  data,
});

export const fetchJobDealMemosFail = (error) => ({
  type: CONSTANTS.FETCH_JOB_DEAL_MEMOS_FAIL,
  error,
});

export const fetchJobInvoiceMemosRequest = (jobId) => ({
  type: CONSTANTS.FETCH_JOB_INVOICE_MEMOS_REQUEST,
  jobId
});

export const fetchJobInvoiceMemosSuccess = (data) => ({
  type: CONSTANTS.FETCH_JOB_INVOICE_MEMOS_SUCCESS,
  data,
});

export const fetchJobInvoiceMemosFail = (error) => ({
  type: CONSTANTS.FETCH_JOB_INVOICE_MEMOS_FAIL,
  error,
});

export const updateInvoiceMemoRequest = (invoiceMemoId, payload) => ({
  type: CONSTANTS.UPDATE_INVOICE_MEMO_REQUEST,
  invoiceMemoId,
  payload
});

export const updateInvoiceMemoSuccess = (data) => ({
  type: CONSTANTS.UPDATE_INVOICE_MEMO_SUCCESS,
  data,
});

export const updateInvoiceMemoFail = (error) => ({
  type: CONSTANTS.UPDATE_INVOICE_MEMO_FAIL,
  error,
});

export const sendJobInvoiceRequest = (jobId, payload) => ({
  type: CONSTANTS.SEND_JOB_INVOICE_REQUEST,
  jobId,
  payload
});

export const sendJobInvoiceSuccess = (data) => ({
  type: CONSTANTS.SEND_JOB_INVOICE_SUCCESS,
  data,
});

export const sendJobInvoiceFail = (error) => ({
  type: CONSTANTS.SEND_JOB_INVOICE_FAIL,
  error,
});

export const fetchInvoiceByMemoRequest = (jobId, memoId) => ({
  type: CONSTANTS.FETCH_INVOICE_BY_MEMO_REQUEST,
  jobId,
  memoId
});

export const fetchInvoiceByMemoSuccess = (data) => ({
  type: CONSTANTS.FETCH_INVOICE_BY_MEMO_SUCCESS,
  data,
});

export const fetchInvoiceByMemoFail = (error) => ({
  type: CONSTANTS.FETCH_INVOICE_BY_MEMO_FAIL,
  error,
});

export const updateInvoiceRequest = (jobId, invoiceId, payload) => ({
  type: CONSTANTS.UPDATE_INVOICE_REQUEST,
  jobId,
  invoiceId,
  payload
});

export const updateInvoiceSuccess = (data) => ({
  type: CONSTANTS.UPDATE_INVOICE_SUCCESS,
  data,
});

export const updateInvoiceFail = (error) => ({
  type: CONSTANTS.UPDATE_INVOICE_FAIL,
  error,
});

export const payApprovedInvoiceRequest = (jobId, payload) => ({
  type: CONSTANTS.PAY_APPROVED_INVOICE_REQUEST,
  jobId,
  payload
});

export const payApprovedInvoiceSuccess = (data) => ({
  type: CONSTANTS.PAY_APPROVED_INVOICE_SUCCESS,
  data,
});

export const payApprovedInvoiceFail = (error) => ({
  type: CONSTANTS.PAY_APPROVED_INVOICE_FAIL,
  error,
});
