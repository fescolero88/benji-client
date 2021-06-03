import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

import { serializeKeys, deserializeKeys } from '@iso/lib/helpers/keyNormalizer';
import request from '@iso/lib/helpers/httpClient';
import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';
import cloneDeep from 'lodash/cloneDeep';

function* fetchSkills() {
  try {
    const data = yield call(request, '/user_profile/skills/', 'GET', null, true);
    yield put(ACTIONS.fetchUserSkillsSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchUserSkillsFail(error));
  }
}

function* fetchUsers() {
  try {
    const data = yield call(request, '/users/', 'GET', null, true);
    yield put(ACTIONS.fetchUsersSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchUsersFail(error));
  }
}

function* fetchUserDetail(action) {
  try {
    const data = yield call(request, `/users/${action.id}/`, 'GET', null, true);
    yield put(ACTIONS.fetchUserDetailSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchUserDetailFail(error));
  }
}

function* updateUser(action) {
  try {
    const { id, payload } = action;
    const data = yield call(request, `/users/${id}/`, 'PATCH', deserializeKeys(payload), true);
    yield put(ACTIONS.updateUserSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateUserFail(error));
  }
}

function* updateUserExpertise(action) {
  try {
    const { id, payload } = action;
    const data = yield call(request, `/users/${id}/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.updateUserExpertiseSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.updateUserExpertiseFail(error));
  }
}

function* changePassword(action) {
  try {
    const { payload } = action;
    const body = cloneDeep(payload);
    const data = yield call(request, '/change_password/', 'POST', deserializeKeys(body), true);
    yield put(ACTIONS.changePasswordSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.changePasswordFail(error));
  }
}

function* inviteStaff(action) {
  try {
    const { payload } = action;
    const body = cloneDeep(payload);
    const data = yield call(request, '/invite_company_staff/', 'POST', deserializeKeys(body), true);
    yield put(ACTIONS.inviteStaffSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.inviteStaffFail(error));
  }
}

function* fetchUserCompanies({userId}) {
  try {
    const data = yield call(request, `/user/${userId}/production_company/`, 'GET', null, true);
    yield put(ACTIONS.fetchUserCompaniesSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchUserCompaniesFail(error));
  }
}

function* fetchProducers() {
  try {
    const data = yield call(request, '/producers/', 'GET', null, true);
    yield put(ACTIONS.fetchProducersSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchProducersFail(error));
  }
}

export default function* userSaga() {
  yield takeLatest(CONSTANTS.FETCH_USER_SKILLS_REQUEST, fetchSkills);
  yield takeLatest(CONSTANTS.FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(CONSTANTS.FETCH_USER_DETAIL_REQUEST, fetchUserDetail);
  yield takeEvery(CONSTANTS.UPDATE_USER_REQUEST, updateUser);
  yield takeEvery(CONSTANTS.UPDATE_USER_EXPERTISE_REQUEST, updateUserExpertise);
  yield takeEvery(CONSTANTS.CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeEvery(CONSTANTS.INVITE_STAFF_REQUEST, inviteStaff);
  yield takeLatest(CONSTANTS.FETCH_USER_COMPANIES_REQUEST, fetchUserCompanies);
  yield takeLatest(CONSTANTS.FETCH_PRODUCERS_REQUEST, fetchProducers);
}
