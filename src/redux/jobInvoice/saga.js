import {put, takeLatest, call, takeEvery} from 'redux-saga/effects';
import { serializeKeys, deserializeKeys } from '@iso/lib/helpers/keyNormalizer';
import request from '@iso/lib/helpers/httpClient';
import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';

function* fetchJobDealMemos({ jobId }) {
  try {
    const data = yield call(request, `/job/${jobId}/contractor_deal_memos/`, 'GET', null, true);
    yield put(ACTIONS.fetchJobDealMemosSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchJobDealMemosFail(error));
  }
}

function* fetchJobInvoiceMemos({ jobId }) {
  try {
    const data = yield call(request, `/job/${jobId}/contractor_invoices/`, 'GET', null, true);
    yield put(ACTIONS.fetchJobInvoiceMemosSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchJobInvoiceMemosFail(error));
  }
}

function* updateInvoiceMemo({ invoiceMemoId, payload }) {
  try {
    const data = yield call(request, `/invoice_memo/${invoiceMemoId}/`, 'PATCH', deserializeKeys(payload), true);
    yield put(ACTIONS.updateInvoiceMemoSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateInvoiceMemoFail(error));
  }
}

function* fetchInvoiceByMemo({ jobId, memoId }) {
  try {
    const data = yield call(request, `/job/${jobId}/job_memo/${memoId}/invoice/`, 'GET', null, true);
    yield put(ACTIONS.fetchInvoiceByMemoSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchInvoiceByMemoFail(error));
  }
}

function* updateInvoice({ jobId, invoiceId, payload }) {
  try {
    const data = yield call(request, `/job/${jobId}/invoice/${invoiceId}/process/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.updateInvoiceSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateInvoiceFail(error));
  }
}

function* sendJobInvoice({ jobId, payload }) {
  try {
    const data = yield call(request, `/job/${jobId}/wrap_job/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.sendJobInvoiceSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.sendJobInvoiceFail(error));
  }
}

function* payApprovedInvoice({ jobId, payload }) {
  try {
    const data = yield call(request, `/job/${jobId}/pay_invoices/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.payApprovedInvoiceSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.payApprovedInvoiceFail(error));
  }
}

export default function* jobInvoiceSaga() {
  yield takeLatest(CONSTANTS.FETCH_JOB_DEAL_MEMOS_REQUEST, fetchJobDealMemos);
  yield takeLatest(CONSTANTS.FETCH_JOB_INVOICE_MEMOS_REQUEST, fetchJobInvoiceMemos);
  yield takeLatest(CONSTANTS.FETCH_INVOICE_BY_MEMO_REQUEST, fetchInvoiceByMemo);
  yield takeLatest(CONSTANTS.UPDATE_INVOICE_MEMO_REQUEST, updateInvoiceMemo);
  yield takeLatest(CONSTANTS.UPDATE_INVOICE_REQUEST, updateInvoice);
  yield takeLatest(CONSTANTS.SEND_JOB_INVOICE_REQUEST, sendJobInvoice);
  yield takeLatest(CONSTANTS.PAY_APPROVED_INVOICE_REQUEST, payApprovedInvoice);
}
