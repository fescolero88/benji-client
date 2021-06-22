import * as CONSTANTS from './constants';

export const fetchPersonalNetworkUsersRequest = (userId) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_REQUEST,
  userId
});

export const fetchPersonalNetworkUsersSuccess = (data) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_SUCCESS,
  data,
});

export const fetchPersonalNetworkUsersFail = (error) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_FAIL,
  error,
});

export const fetchPersonalNetworkUserDetailRequest = (userId) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_REQUEST,
  userId
});

export const fetchPersonalNetworkUserDetailSuccess = (data) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_SUCCESS,
  data,
});

export const fetchPersonalNetworkUserDetailFail = (error) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_FAIL,
  error,
});

export const invitePersonalNetworkUserRequest = (userId, payload) => ({
  type: CONSTANTS.INVITE_PERSONAL_NETWORK_USER_REQUEST,
  userId,
  payload
});

export const invitePersonalNetworkUserSuccess = (data) => ({
  type: CONSTANTS.INVITE_PERSONAL_NETWORK_USER_SUCCESS,
  data
});

export const invitePersonalNetworkUserFail = (error) => ({
  type: CONSTANTS.INVITE_PERSONAL_NETWORK_USER_FAIL,
  error,
});

export const fetchPersonalNetworkSentInvitationRequest = (userId, filter) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_REQUEST,
  userId,
  filter
});

export const fetchPersonalNetworkSentInvitationSuccess = (data) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_SUCCESS,
  data,
});

export const fetchPersonalNetworkSentInvitationFail = (error) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_FAIL,
  error,
});

export const fetchPersonalNetworkReceivedInvitationRequest = (userId, filter) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_REQUEST,
  userId,
  filter
});

export const fetchPersonalNetworkReceivedInvitationSuccess = (data) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_SUCCESS,
  data,
});

export const fetchPersonalNetworkReceivedInvitationFail = (error) => ({
  type: CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_FAIL,
  error,
});

export const acceptPersonalNetworkInvitationRequest = (invitationId) => ({
  type: CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_REQUEST,
  invitationId,
});

export const acceptPersonalNetworkInvitationSuccess = (data) => ({
  type: CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_SUCCESS,
  data,
});

export const acceptPersonalNetworkInvitationFail = (error) => ({
  type: CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_FAIL,
  error,
});

export const rejectPersonalNetworkInvitationRequest = (invitationId) => ({
  type: CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_REQUEST,
  invitationId,
});

export const rejectPersonalNetworkInvitationSuccess = (data) => ({
  type: CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_SUCCESS,
  data,
});

export const rejectPersonalNetworkInvitationFail = (error) => ({
  type: CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_FAIL,
  error,
});

export const deletePersonalNetworkUserRequest = (userId) => ({
  type: CONSTANTS.DELETE_PERSONAL_NETWORK_USER_REQUEST,
  userId,
});

export const deletePersonalNetworkUserSuccess = (data) => ({
  type: CONSTANTS.DELETE_PERSONAL_NETWORK_USER_SUCCESS,
  data,
});

export const deletePersonalNetworkUserFail = (error) => ({
  type: CONSTANTS.DELETE_PERSONAL_NETWORK_USER_FAIL,
  error,
});

export const setFavoritePersonalNetworkUserRequest = (userId, payload) => ({
  type: CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_REQUEST,
  userId,
  payload
});

export const setFavoritePersonalNetworkUserSuccess = (data) => ({
  type: CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_SUCCESS,
  data
});

export const setFavoritePersonalNetworkUserFail = (error) => ({
  type: CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_FAIL,
  error,
});
