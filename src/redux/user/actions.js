import * as CONSTANTS from './constants';

export const fetchUserSkillsRequest = () => ({
  type: CONSTANTS.FETCH_USER_SKILLS_REQUEST,
});

export const fetchUserSkillsSuccess = (data) => ({
  type: CONSTANTS.FETCH_USER_SKILLS_SUCCESS,
  data
});

export const fetchUserSkillsFail = (error) => ({
  type: CONSTANTS.FETCH_USER_SKILLS_FAIL,
  error
});

export const fetchUsersRequest = () => ({
  type: CONSTANTS.FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: CONSTANTS.FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFail = (error) => ({
  type: CONSTANTS.FETCH_USERS_FAIL,
  error,
});

export const fetchUserDetailRequest = (id) => ({
  type: CONSTANTS.FETCH_USER_DETAIL_REQUEST,
  id
});

export const fetchUserDetailSuccess = (user) => ({
  type: CONSTANTS.FETCH_USER_DETAIL_SUCCESS,
  user,
});

export const fetchUserDetailFail = (error) => ({
  type: CONSTANTS.FETCH_USER_DETAIL_FAIL,
  error,
});

export const updateUserRequest = (id, data) => ({
  type: CONSTANTS.UPDATE_USER_REQUEST,
  id,
  payload: data
});

export const updateUserSuccess = (user) => ({
  type: CONSTANTS.UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFail = (error) => ({
  type: CONSTANTS.UPDATE_USER_FAIL,
  error,
});

export const updateUserExpertiseRequest = (id, payload) => ({
  type: CONSTANTS.UPDATE_USER_EXPERTISE_REQUEST,
  id,
  payload
});

export const updateUserExpertiseSuccess = (data) => ({
  type: CONSTANTS.UPDATE_USER_EXPERTISE_SUCCESS,
  data,
});

export const updateUserExpertiseFail = (error) => ({
  type: CONSTANTS.UPDATE_USER_EXPERTISE_FAIL,
  error,
});

export const changePasswordRequest = (data) => ({
  type: CONSTANTS.CHANGE_PASSWORD_REQUEST,
  payload: data
});

export const changePasswordSuccess = (user) => ({
  type: CONSTANTS.CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFail = (error) => ({
  type: CONSTANTS.CHANGE_PASSWORD_FAIL,
  error,
});

export const inviteStaffRequest = (data) => ({
  type: CONSTANTS.INVITE_STAFF_REQUEST,
  payload: data
});

export const inviteStaffSuccess = (users) => ({
  type: CONSTANTS.INVITE_STAFF_SUCCESS,
  users
});

export const inviteStaffFail = (error) => ({
  type: CONSTANTS.INVITE_STAFF_FAIL,
  error,
});

export const fetchUserCompaniesRequest = (userId) => ({
  type: CONSTANTS.FETCH_USER_COMPANIES_REQUEST,
  userId
});

export const fetchUserCompaniesSuccess = (data) => ({
  type: CONSTANTS.FETCH_USER_COMPANIES_SUCCESS,
  data
});

export const fetchUserCompaniesFail = (error) => ({
  type: CONSTANTS.FETCH_USER_COMPANIES_FAIL,
  error,
});

export const fetchProducersRequest = () => ({
  type: CONSTANTS.FETCH_PRODUCERS_REQUEST,
});

export const fetchProducersSuccess = (users) => ({
  type: CONSTANTS.FETCH_PRODUCERS_SUCCESS,
  users,
});

export const fetchProducersFail = (error) => ({
  type: CONSTANTS.FETCH_PRODUCERS_FAIL,
  error,
});
