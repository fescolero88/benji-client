import produce from 'immer';
import * as CONSTANTS from './constants';

const initState = {
  invoices: [],
  invoice: null,
  stats: {},
  list: {
    loading: false,
    error: null
  },
  detail: {
    loading: false,
    error: null
  },
  update: {
    loading: false,
    error: null
  },
  send: {
    loading: false,
    error: null
  },
  financeStats: {
    loading: false,
    error: null
  },
  billUpdateAction: {
    loading: false,
    error: null
  },
  serviceUpdateAction: {
    loading: false,
    error: null
  },
  receiptCreateAction: {
    loading: false,
    error: null
  },
  receiptUpdateAction: {
    loading: false,
    error: null
  },
  receiptDeleteAction: {
    loading: false,
    error: null
  },
  documentCreateAction: {
    loading: false,
    error: null
  },
  documentUpdateAction: {
    loading: false,
    error: null
  },
  documentDeleteAction: {
    loading: false,
    error: null
  },
  setInvoiceNumberAction: {
    loading: false,
    error: null
  }
};

const contractorInvoiceReducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.FETCH_CONTRACTOR_INVOICES_REQUEST:
        draft.invoices = [];
        draft.list = { loading: true, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_INVOICES_SUCCESS:
        draft.invoices = action.data;
        draft.list = { loading: false, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_INVOICES_FAIL:
        draft.list = { loading: false, error: action.error };
        break;

      case CONSTANTS.FETCH_CONTRACTOR_FINANCE_STATS_REQUEST:
        draft.financeStats = { loading: true, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_FINANCE_STATS_SUCCESS:
        draft.stats = action.data;
        draft.financeStats = { loading: false, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_FINANCE_STATS_FAIL:
        draft.financeStats = { loading: false, error: action.error };
        break;

      case CONSTANTS.FETCH_CONTRACTOR_INVOICE_DETAIL_REQUEST:
        draft.detail = { loading: true, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_INVOICE_DETAIL_SUCCESS:
        draft.invoice = action.data;
        draft.detail = { loading: false, error: null };
        break;
      case CONSTANTS.FETCH_CONTRACTOR_INVOICE_DETAIL_FAIL:
        draft.detail = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_REQUEST:
        draft.update = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_SUCCESS:
        draft.invoice = {...draft.invoice, ...action.data};
        draft.update = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_FAIL:
        draft.update = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_FROM_REQUEST:
        draft.billUpdateAction = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_FROM_SUCCESS:
        draft.invoice.billFrom = action.data;
        draft.billUpdateAction = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_FROM_FAIL:
        draft.billUpdateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_TO_REQUEST:
        draft.billUpdateAction = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_TO_SUCCESS:
        draft.invoice.billTo = action.data;
        draft.billUpdateAction = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_BILL_TO_FAIL:
        draft.billUpdateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_SERVICE_REQUEST:
        draft.serviceUpdateAction = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_SERVICE_SUCCESS:
        draft.invoice.lineItems = action.data;
        draft.serviceUpdateAction = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_SERVICE_FAIL:
        draft.serviceUpdateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_RECEIPT_REQUEST:
        draft.receiptCreateAction = { loading: true, error: null };
        break;
      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_RECEIPT_SUCCESS:
        draft.invoice.receipts = [...draft.invoice.receipts, action.data];
        draft.receiptCreateAction = { loading: false, error: null };
        break;
      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_RECEIPT_FAIL:
        draft.receiptCreateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_RECEIPT_REQUEST:
        draft.receiptUpdateAction = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_RECEIPT_SUCCESS:
        draft.invoice.receipts = draft.invoice.receipts.map(receipt => receipt.id === action.data.id ? action.data : receipt);
        draft.receiptUpdateAction = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_RECEIPT_FAIL:
        draft.receiptUpdateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_RECEIPT_REQUEST:
        draft.receiptDeleteAction = { loading: true, error: null };
        break;
      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_RECEIPT_SUCCESS:
        draft.invoice.receipts = draft.invoice.receipts.filter(receipt => receipt.id !== action.data);
        draft.receiptDeleteAction = { loading: false, error: null };
        break;
      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_RECEIPT_FAIL:
        draft.receiptDeleteAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_DOCUMENT_REQUEST:
        draft.documentCreateAction = { loading: true, error: null };
        break;
      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_DOCUMENT_SUCCESS:
        draft.invoice.documents = [...draft.invoice.documents, action.data];
        draft.documentCreateAction = { loading: false, error: null };
        break;
      case CONSTANTS.CREATE_CONTRACTOR_INVOICE_DOCUMENT_FAIL:
        draft.documentCreateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_DOCUMENT_REQUEST:
        draft.documentUpdateAction = { loading: true, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_DOCUMENT_SUCCESS:
        draft.invoice.documents = draft.invoice.documents.map(document => document.id === action.data.id ? action.data : document);
        draft.documentUpdateAction = { loading: false, error: null };
        break;
      case CONSTANTS.UPDATE_CONTRACTOR_INVOICE_DOCUMENT_FAIL:
        draft.documentUpdateAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_DOCUMENT_REQUEST:
        draft.documentDeleteAction = { loading: true, error: null };
        break;
      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_DOCUMENT_SUCCESS:
        draft.invoice.documents = draft.invoice.documents.filter(document => document.id !== action.data);
        draft.documentDeleteAction = { loading: false, error: null };
        break;
      case CONSTANTS.DELETE_CONTRACTOR_INVOICE_DOCUMENT_FAIL:
        draft.documentDeleteAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.SET_CONTRACTOR_INVOICE_NUMBER_REQUEST:
        draft.setInvoiceNumberAction = { loading: true, error: null };
        break;
      case CONSTANTS.SET_CONTRACTOR_INVOICE_NUMBER_SUCCESS:
        draft.invoice = {...draft.invoice, ...action.data};
        draft.setInvoiceNumberAction = { loading: false, error: null };
        break;
      case CONSTANTS.SET_CONTRACTOR_INVOICE_NUMBER_FAIL:
        draft.setInvoiceNumberAction = { loading: false, error: action.error };
        break;

      case CONSTANTS.SEND_CONTRACTOR_INVOICE_REQUEST:
        draft.send = { loading: true, error: null };
        break;
      case CONSTANTS.SEND_CONTRACTOR_INVOICE_SUCCESS:
        draft.invoice = {...draft.invoice, ...action.data};
        draft.send = { loading: false, error: null };
        break;
      case CONSTANTS.SEND_CONTRACTOR_INVOICE_FAIL:
        draft.send = { loading: false, error: action.error };
        break;

      default:
        return state;
    }
  });

export default contractorInvoiceReducer;
