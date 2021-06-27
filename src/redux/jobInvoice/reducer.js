import produce from 'immer';
import * as CONSTANTS from './constants';

const initState = {
  jobDepartments: [],
  jobMemos: [],
  invoiceDepartments: [],
  invoiceMemos: [],
  invoice: null,
  fetchDealMemos: {
    loading: false,
    error: null
  },
  fetchInvoiceMemos: {
    loading: false,
    error: null
  },
  updateInvoiceMemo: {
    loading: false,
    error: null
  },
  fetchInvoiceByMemo: {
    loading: false,
    error: null
  },
  updateInvoice: {
    loading: false,
    error: null
  },
  sendInvoice: {
    loading: false,
    error: null
  },
  payApproved: {
    loading: false,
    error: null
  }
};

const jobInvoiceReducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.FETCH_JOB_DEAL_MEMOS_REQUEST:
        draft.fetchDealMemos = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_JOB_DEAL_MEMOS_SUCCESS:
        draft.jobDepartments = action.data.departments;
        draft.jobMemos = action.data.jobMemos;
        draft.fetchDealMemos = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_JOB_DEAL_MEMOS_FAIL:
        draft.fetchDealMemos = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_JOB_INVOICE_MEMOS_REQUEST:
        draft.fetchInvoiceMemos = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_JOB_INVOICE_MEMOS_SUCCESS:
        draft.invoiceDepartments = action.data.departments;
        draft.invoiceMemos = action.data.invoiceMemos;
        draft.fetchInvoiceMemos = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_JOB_INVOICE_MEMOS_FAIL:
        draft.fetchInvoiceMemos = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_INVOICE_BY_MEMO_REQUEST:
        draft.fetchInvoiceByMemo = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_INVOICE_BY_MEMO_SUCCESS:
        draft.invoice = action.data;
        draft.fetchInvoiceByMemo = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_INVOICE_BY_MEMO_FAIL:
        draft.fetchInvoiceByMemo = {loading: false, error: action.error};
        break;

      case CONSTANTS.UPDATE_INVOICE_REQUEST:
        draft.updateInvoice = {loading: true, error: null};
        break;
      case CONSTANTS.UPDATE_INVOICE_SUCCESS:
        draft.updateInvoice = {loading: false, error: null};
        draft.invoiceMemos = draft.invoiceMemos.map(memo => memo.invoice.id === action.data.id ? {...memo, invoice: action.data} : memo);
        break;
      case CONSTANTS.UPDATE_INVOICE_FAIL:
        draft.updateInvoice = {loading: false, error: action.error};
        break;

      case CONSTANTS.UPDATE_INVOICE_MEMO_REQUEST:
        draft.updateInvoiceMemo = {loading: true, error: null};
        break;
      case CONSTANTS.UPDATE_INVOICE_MEMO_SUCCESS:
        draft.jobMemos = draft.jobMemos.map(memo => memo.invoiceMemo.id === action.data.id ? {...memo, invoiceMemo: action.data} : memo)
        draft.updateInvoiceMemo = {loading: false, error: null};
        break;
      case CONSTANTS.UPDATE_INVOICE_MEMO_FAIL:
        draft.updateInvoiceMemo = {loading: false, error: action.error};
        break;

      case CONSTANTS.SEND_JOB_INVOICE_REQUEST:
        draft.sendInvoice = {loading: true, error: null};
        break;
      case CONSTANTS.SEND_JOB_INVOICE_SUCCESS:
        draft.sendInvoice = {loading: false, error: null};
        break;
      case CONSTANTS.SEND_JOB_INVOICE_FAIL:
        draft.sendInvoice = {loading: false, error: action.error};
        break;

      case CONSTANTS.PAY_APPROVED_INVOICE_REQUEST:
        draft.payApproved = {loading: true, error: null};
        break;
      case CONSTANTS.PAY_APPROVED_INVOICE_SUCCESS:
        draft.invoiceMemos = draft.invoiceMemos.map(memo => {
          const newInvoice = action.data.find(invoice => invoice.id === memo.invoice.id);
          if (newInvoice) {
            return {...memo, invoice: newInvoice};
          } else {
            return memo;
          }
        });
        draft.payApproved = {loading: false, error: null};
        break;
      case CONSTANTS.PAY_APPROVED_INVOICE_FAIL:
        draft.payApproved = {loading: false, error: action.error};
        break;

      default:
        return state;
    }
  });

export default jobInvoiceReducer;
