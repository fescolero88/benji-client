import takeQueued from '@iso/lib/helpers/takeQueued';
import { put, takeLatest, takeEvery, call, fork } from 'redux-saga/effects';
import { serializeKeys, deserializeKeys } from '@iso/lib/helpers/keyNormalizer';
import request from '@iso/lib/helpers/httpClient';
import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';

function* fetchCompanies() {
  try {
    const data = yield call(request, '/production_company/', 'GET', null, false);
    yield put(ACTIONS.fetchCompaniesSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchCompaniesFail(error));
  }
}

function* fetchCompanyDetail({ id }) {
  try {
    const data = yield call(request, `/production_company/${id}/`, 'GET', null, true);
    yield put(ACTIONS.fetchCompanyDetailSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchCompanyDetailFail(error));
  }
}

function* fetchCompanyProfile({ id }) {
  try {
    const data = yield call(request, `/production_company/${id}/profile/`, 'GET', null, true);
    yield put(ACTIONS.fetchCompanyProfileSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchCompanyProfileFail(error));
  }
}

function* createCompany({ payload }) {
  try {
    const data = yield call(request, `/company/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.createCompanySuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.createCompanyFail(error));
  }
}

function* updateCompany({ id, payload }) {
  try {
    const data = yield call(request, `/company/${id}/`, 'PATCH', deserializeKeys(payload), true);
    yield put(ACTIONS.updateCompanySuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateCompanyFail(error));
  }
}

function* updateCompanyProfile({ id, payload }) {
  try {
    const data = yield call(request, `/production_company/${id}/profile/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.updateCompanyProfileSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateCompanyProfileFail(error));
  }
}

function* acceptCompanyPermissionByOwner({ token }) {
  try {
    const returnUri = yield call(request, `/validation/accept_company_access_token/${token}/`, 'GET', null, false);
    yield put(ACTIONS.acceptCompanyPermissionByOwnerSuccess());
    window.location.href = returnUri;
  } catch (error) {
    yield put(ACTIONS.acceptCompanyPermissionByOwnerFail(error));
  }
}

function* declineCompanyPermissionByOwner({ token }) {
  try {
    const returnUri = yield call(request, `/validation/decline_company_access_token/${token}/`, 'GET', null, false);
    yield put(ACTIONS.declineCompanyPermissionByOwnerSuccess());
    window.location.href = returnUri;
  } catch (error) {
    yield put(ACTIONS.declineCompanyPermissionByOwnerFail(error));
  }
}

export default function* companySaga() {
  yield takeLatest(CONSTANTS.FETCH_COMPANIES_REQUEST, fetchCompanies);
  yield takeLatest(CONSTANTS.FETCH_COMPANY_DETAIL_REQUEST, fetchCompanyDetail);
  yield fork(takeQueued, CONSTANTS.CREATE_COMPANY_REQUEST, createCompany);
  yield fork(takeQueued, CONSTANTS.UPDATE_COMPANY_REQUEST, updateCompany);
  yield takeLatest(CONSTANTS.FETCH_COMPANY_PROFILE_REQUEST, fetchCompanyProfile);
  yield takeEvery(CONSTANTS.UPDATE_COMPANY_PROFILE_REQUEST, updateCompanyProfile);
  yield takeEvery(CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_REQUEST, acceptCompanyPermissionByOwner);
  yield takeEvery(CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_REQUEST, declineCompanyPermissionByOwner);
}
