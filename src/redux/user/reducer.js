import produce from 'immer';
import * as CONSTANTS from './constants';

const initialState = {
  users: [],
  user: null,
  producers: [],
  skills: [],
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
    error: null,
    completed: false
  },
  profile: {
    loading: false,
    error: null
  },
  invite: {
    loading: false,
    error: null,
    invitees: [],
  },
  password: {
    loading: false,
    error: null
  },
  company: {
    companies: [],
    loading: false,
    error: null
  },
  producerList: {
    loading: false,
    error: null
  }
};

const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.FETCH_USER_SKILLS_SUCCESS:
        draft.skills = action.data;
        break;

      case CONSTANTS.FETCH_USERS_REQUEST:
        draft.list = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_USERS_SUCCESS:
        draft.users = action.users;
        draft.list = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_USERS_FAIL:
        draft.users = [];
        draft.list = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_USER_DETAIL_REQUEST:
        draft.detail = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_USER_DETAIL_SUCCESS:
        draft.user = action.user;
        draft.detail = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_USER_DETAIL_FAIL:
        draft.user = null;
        draft.detail = {loading: false, error: action.error};
        break;

      case CONSTANTS.UPDATE_USER_REQUEST:
        draft.update = {loading: true, error: null, updated: false};
        break;
      case CONSTANTS.UPDATE_USER_SUCCESS:
        draft.user = action.user;
        draft.update = {loading: false, error: null, updated: true};
        break;
      case CONSTANTS.UPDATE_USER_FAIL:
        draft.update = {loading: false, error: action.error, updated: false};
        break;

      case CONSTANTS.UPDATE_USER_EXPERTISE_REQUEST:
        draft.profile = {loading: true, error: null};
        break;
      case CONSTANTS.UPDATE_USER_EXPERTISE_SUCCESS:
        draft.user = {...draft.user, ...action.data};
        draft.profile = {loading: false, error: null};
        break;
      case CONSTANTS.UPDATE_USER_EXPERTISE_FAIL:
        draft.profile = {loading: false, error: action.error};
        break;

      case CONSTANTS.CHANGE_PASSWORD_REQUEST:
        draft.password = {loading: true, error: null};
        break;
      case CONSTANTS.CHANGE_PASSWORD_SUCCESS:
        draft.password = {loading: false, error: null};
        break;
      case CONSTANTS.CHANGE_PASSWORD_FAIL:
        draft.password = {loading: false, error: action.error};
        break;

      case CONSTANTS.INVITE_STAFF_REQUEST:
        draft.invite = {loading: true, error: null, invitees: []};
        break;
      case CONSTANTS.INVITE_STAFF_SUCCESS:
        draft.invite = {loading: false, error: null, invitees: action.users};
        break;
      case CONSTANTS.INVITE_STAFF_FAIL:
        draft.invite = {loading: false, error: action.error, invitees: []};
        break;

      case CONSTANTS.FETCH_USER_COMPANIES_REQUEST:
        draft.company = {loading: true, error: null, companies: []};
        break;
      case CONSTANTS.FETCH_USER_COMPANIES_SUCCESS:
        draft.company = {loading: false, error: null, companies: action.data};
        break;
      case CONSTANTS.FETCH_USER_COMPANIES_FAIL:
        draft.company = {loading: false, error: action.error, companies: []};
        break;

      case CONSTANTS.FETCH_PRODUCERS_REQUEST:
        draft.producerList = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_PRODUCERS_SUCCESS:
        draft.producers = action.users;
        draft.producerList = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_PRODUCERS_FAIL:
        draft.producers = [];
        draft.producerList = {loading: false, error: action.error};
        break;
      default:
        break;
    }
  });

export default userReducer;
