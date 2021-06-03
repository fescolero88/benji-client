import * as CONSTANTS from './constants';

export const fetchCompaniesRequest = () => ({
  type: CONSTANTS.FETCH_COMPANIES_REQUEST,
});

export const fetchCompaniesSuccess = (companies) => ({
  type: CONSTANTS.FETCH_COMPANIES_SUCCESS,
  companies,
});

export const fetchCompaniesFail = (error) => ({
  type: CONSTANTS.FETCH_COMPANIES_FAIL,
  error,
});

export const fetchCompanyDetailRequest = (id) => ({
  type: CONSTANTS.FETCH_COMPANY_DETAIL_REQUEST,
  id
});

export const fetchCompanyDetailSuccess = (data) => ({
  type: CONSTANTS.FETCH_COMPANY_DETAIL_SUCCESS,
  data
});

export const fetchCompanyDetailFail = (error) => ({
  type: CONSTANTS.FETCH_COMPANY_DETAIL_FAIL,
  error
});

export const createCompanyRequest = (payload) => ({
  type: CONSTANTS.CREATE_COMPANY_REQUEST,
  payload
});

export const createCompanySuccess = (data) => ({
  type: CONSTANTS.CREATE_COMPANY_SUCCESS,
  data
});

export const createCompanyFail = (error) => ({
  type: CONSTANTS.CREATE_COMPANY_FAIL,
  error
});

export const updateCompanyRequest = (id, payload) => ({
  type: CONSTANTS.UPDATE_COMPANY_REQUEST,
  id,
  payload
});

export const updateCompanySuccess = (data) => ({
  type: CONSTANTS.UPDATE_COMPANY_SUCCESS,
  data
});

export const updateCompanyFail = (error) => ({
  type: CONSTANTS.UPDATE_COMPANY_FAIL,
  error
});

export const fetchCompanyProfileRequest = (id) => ({
  type: CONSTANTS.FETCH_COMPANY_PROFILE_REQUEST,
  id
});

export const fetchCompanyProfileSuccess = (data) => ({
  type: CONSTANTS.FETCH_COMPANY_PROFILE_SUCCESS,
  data
});

export const fetchCompanyProfileFail = (error) => ({
  type: CONSTANTS.FETCH_COMPANY_PROFILE_FAIL,
  error
});

export const updateCompanyProfileRequest = (id, payload) => ({
  type: CONSTANTS.UPDATE_COMPANY_PROFILE_REQUEST,
  id,
  payload
});

export const updateCompanyProfileSuccess = (data) => ({
  type: CONSTANTS.UPDATE_COMPANY_PROFILE_SUCCESS,
  data
});

export const updateCompanyProfileFail = (error) => ({
  type: CONSTANTS.UPDATE_COMPANY_PROFILE_FAIL,
  error
});

export const acceptCompanyPermissionByOwnerRequest = (token) => ({
  type: CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_REQUEST,
  token,
});

export const acceptCompanyPermissionByOwnerSuccess = () => ({
  type: CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_SUCCESS
});

export const acceptCompanyPermissionByOwnerFail = (error) => ({
  type: CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_FAIL,
  error
});

export const declineCompanyPermissionByOwnerRequest = (token) => ({
  type: CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_REQUEST,
  token
});

export const declineCompanyPermissionByOwnerSuccess = (data) => ({
  type: CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_SUCCESS
});

export const declineCompanyPermissionByOwnerFail = (error) => ({
  type: CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_FAIL,
  error
});
