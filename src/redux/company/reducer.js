import produce from 'immer';
import * as CONSTANTS from './constants';

const initialState = {
  loading: false,
  companies: [],
  company: null,
  profile: null,
  create: {
    loading: false,
    error: null
  },
  update: {
    loading: false,
    error: null
  },
  detail: {
    loading: false,
    error: null
  },
  fetchProfile: {
    loading: true,
    error: null
  },
  updateProfile: {
    loading: true,
    error: null
  },
  accept: {
    loading: true,
    error: null
  },
  decline: {
    loading: true,
    error: null
  }
};

const companyReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.FETCH_COMPANIES_REQUEST:
        draft.loading = true;
        break;
      case CONSTANTS.FETCH_COMPANIES_SUCCESS:
        draft.companies = action.companies;
        draft.loading = false;
        break;
      case CONSTANTS.FETCH_COMPANIES_FAIL:
        draft.loading = false;
        break;

      case CONSTANTS.FETCH_COMPANY_DETAIL_REQUEST:
        draft.detail = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_COMPANY_DETAIL_SUCCESS:
        draft.company = action.data;
        draft.detail = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_COMPANY_DETAIL_FAIL:
        draft.detail = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_COMPANY_PROFILE_REQUEST:
        draft.fetchProfile = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_COMPANY_PROFILE_SUCCESS:
        draft.profile = action.data;
        draft.fetchProfile = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_COMPANY_PROFILE_FAIL:
        draft.fetchProfile = {loading: false, error: action.error};
        break;

      case CONSTANTS.UPDATE_COMPANY_PROFILE_REQUEST:
        draft.updateProfile = {loading: true, error: null};
        break;
      case CONSTANTS.UPDATE_COMPANY_PROFILE_SUCCESS:
        draft.profile = action.data;
        draft.updateProfile = {loading: false, error: null};
        break;
      case CONSTANTS.UPDATE_COMPANY_PROFILE_FAIL:
        draft.updateProfile = {loading: false, error: action.error};
        break;

      case CONSTANTS.CREATE_COMPANY_REQUEST:
        draft.create = {loading: true, error: null};
        break;
      case CONSTANTS.CREATE_COMPANY_SUCCESS:
        draft.create = {loading: false, error: null};
        draft.company = action.data;
        break;
      case CONSTANTS.CREATE_COMPANY_FAIL:
        draft.create = {loading: false, error: action.error};
        break;

      case CONSTANTS.UPDATE_COMPANY_REQUEST:
        draft.update = {loading: true, error: null};
        break;
      case CONSTANTS.UPDATE_COMPANY_SUCCESS:
        draft.company = action.data;
        draft.update = {loading: false, error: null};
        break;
      case CONSTANTS.UPDATE_COMPANY_FAIL:
        draft.update = {loading: false, error: action.error};
        break;

      case CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_REQUEST:
        draft.accept = {loading: true, error: null};
        break;
      case CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_SUCCESS:
        draft.accept = {loading: false, error: null};
        break;
      case CONSTANTS.ACCEPT_COMPANY_PERMISSION_BY_OWNER_FAIL:
        draft.accept = {loading: false, error: action.error};
        break;

      case CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_REQUEST:
        draft.decline = {loading: true, error: null};
        break;
      case CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_SUCCESS:
        draft.decline = {loading: false, error: null};
      case CONSTANTS.DECLINE_COMPANY_PERMISSION_BY_OWNER_FAIL:
        draft.decline = {loading: false, error: action.error};
        break;
      default:
        break;
    }
  });

export default companyReducer;
