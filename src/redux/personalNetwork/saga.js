import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import { serializeKeys, deserializeKeys } from '@iso/lib/helpers/keyNormalizer';
import request from '@iso/lib/helpers/httpClient';
import * as CONSTANTS from './constants';
import * as ACTIONS from './actions';

function* fetchPersonalNetworkUsers({userId}) {
  try {
    const data = yield call(request, `/user/${userId}/view_personal_network/`, 'GET', null, true);
    yield put(ACTIONS.fetchPersonalNetworkUsersSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchPersonalNetworkUsersFail(error));
  }
}

function* fetchPersonalNetworkUserDetail({userId}) {
  try {
    const data = yield call(request, `/personal_network/user/${userId}/`, 'GET', null, true);
    yield put(ACTIONS.fetchPersonalNetworkUserDetailSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchPersonalNetworkUserDetailFail(error));
  }
}

function* deletePersonalNetworkUser({userId}) {
  try {
    yield call(request, `/personal_network/connection/${userId}/`, 'DELETE');
    yield put(ACTIONS.deletePersonalNetworkUserSuccess(userId));
  } catch (error) {
    yield put(ACTIONS.deletePersonalNetworkUserFail(error));
  }
}

function* invitePersonalNetworkUser(action) {
  try {
    const { userId, payload } = action;
    const data = yield call(request, `/user/${userId}/personal_network/invite/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.invitePersonalNetworkUserSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.invitePersonalNetworkUserFail(error));
  }
}

function* fetchPersonalNetworkSentInvitation({userId, filter}) {
  try {
    const data = yield call(request, `/user/${userId}/personal_network/sent/`, 'GET', deserializeKeys(filter), true);
    yield put(ACTIONS.fetchPersonalNetworkSentInvitationSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchPersonalNetworkSentInvitationFail(error));
  }
}

function* fetchPersonalNetworkReceivedInvitation({userId, filter}) {
  try {
    const data = yield call(request, `/user/${userId}/personal_network/received/`, 'GET', deserializeKeys(filter), true);
    yield put(ACTIONS.fetchPersonalNetworkReceivedInvitationSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.fetchPersonalNetworkReceivedInvitationFail(error));
  }
}

function* acceptPersonalNetworkInvitation({invitationId}) {
  try {
    const data = yield call(request, `/personal_network/connection/${invitationId}/accept/`, 'POST', null, true);
    yield put(ACTIONS.acceptPersonalNetworkInvitationSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.acceptPersonalNetworkInvitationFail(error));
  }
}

function* rejectPersonalNetworkInvitation({invitationId}) {
  try {
    const data = yield call(request, `/personal_network/connection/${invitationId}/reject/`, 'POST', null, true);
    yield put(ACTIONS.rejectPersonalNetworkInvitationSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.rejectPersonalNetworkInvitationFail(error));
  }
}

function* setFavoritePersonalNetworkUser({userId, payload}) {
  try {
    const data = yield call(request, `/user/${userId}/personal_network/like_unlike/`, 'POST', deserializeKeys(payload), true);
    yield put(ACTIONS.setFavoritePersonalNetworkUserSuccess(serializeKeys(data)));
  } catch (error) {
    yield put(ACTIONS.setFavoritePersonalNetworkUserFail(error));
  }
}

export default function* personalNetworkSaga() {
  yield takeLatest(CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_REQUEST, fetchPersonalNetworkUsers);
  yield takeLatest(CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_REQUEST, fetchPersonalNetworkUserDetail);
  yield takeLatest(CONSTANTS.DELETE_PERSONAL_NETWORK_USER_REQUEST, deletePersonalNetworkUser);
  yield takeEvery(CONSTANTS.INVITE_PERSONAL_NETWORK_USER_REQUEST, invitePersonalNetworkUser);
  yield takeEvery(CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_REQUEST, fetchPersonalNetworkSentInvitation);
  yield takeEvery(CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_REQUEST, fetchPersonalNetworkReceivedInvitation);
  yield takeEvery(CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_REQUEST, acceptPersonalNetworkInvitation);
  yield takeEvery(CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_REQUEST, rejectPersonalNetworkInvitation);
  yield takeEvery(CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_REQUEST, setFavoritePersonalNetworkUser);
}
