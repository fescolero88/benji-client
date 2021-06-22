import produce from 'immer';
import * as CONSTANTS from './constants';

const initialState = {
  users: [],
  user: null,
  sentInvitations: [],
  receivedInvitations: [],
  list: {
    loading: false,
    error: null
  },
  detail: {
    loading: false,
    error: null
  },
  delete: {
    loading: false,
    error: null
  },
  invite: {
    loading: false,
    error: null,
    professionals: [],
  },
  fetchSentInvitation: {
    loading: false,
    error: null
  },
  fetchReceivedInvitation: {
    loading: false,
    error: null
  },
  acceptInvitation: {
    loading: false,
    error: null
  },
  rejectInvitation: {
    loading: false,
    error: null
  },
  favorite: {
    loading: false,
    error: null
  }
};

const personalNetworkReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_REQUEST:
        draft.list = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_SUCCESS:
        draft.users = action.data;
        draft.list = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_USERS_FAIL:
        draft.users = [];
        draft.list = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_REQUEST:
        draft.detail = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_SUCCESS:
        draft.user = action.data;
        draft.detail = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_USER_DETAIL_FAIL:
        draft.user = null;
        draft.detail = {loading: false, error: action.error};
        break;

      case CONSTANTS.DELETE_PERSONAL_NETWORK_USER_REQUEST:
        draft.delete = {loading: true, error: null};
        break;
      case CONSTANTS.DELETE_PERSONAL_NETWORK_USER_SUCCESS:
        draft.users = draft.users.filter(user => user.id !== action.data);
        draft.delete = {loading: false, error: null};
        break;
      case CONSTANTS.DELETE_PERSONAL_NETWORK_USER_FAIL:
        draft.delete = {loading: false, error: action.error};
        break;

      case CONSTANTS.INVITE_PERSONAL_NETWORK_USER_REQUEST:
        draft.invite = {loading: true, error: null, professionals: []};
        break;
      case CONSTANTS.INVITE_PERSONAL_NETWORK_USER_SUCCESS:
        draft.invite = {loading: false, error: null, professionals: action.data};
        break;
      case CONSTANTS.INVITE_PERSONAL_NETWORK_USER_FAIL:
        draft.invite = {loading: false, error: action.error, professionals: []};
        break;

      case CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_REQUEST:
        draft.fetchSentInvitation = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_SUCCESS:
        draft.sentInvitations = action.data;
        draft.fetchSentInvitation = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_SENT_INVITATION_FAIL:
        draft.fetchSentInvitation = {loading: false, error: action.error};
        break;

      case CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_REQUEST:
        draft.fetchReceivedInvitation = {loading: true, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_SUCCESS:
        draft.receivedInvitations = action.data;
        draft.fetchReceivedInvitation = {loading: false, error: null};
        break;
      case CONSTANTS.FETCH_PERSONAL_NETWORK_RECEIVED_INVITATION_FAIL:
        draft.fetchReceivedInvitation = {loading: false, error: action.error};
        break;

      case CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_REQUEST:
        draft.acceptInvitation = {loading: true, error: null};
        break;
      case CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_SUCCESS:
        draft.receivedInvitations = draft.receivedInvitations.map(invitation => invitation.id === action.data.id ? action.data : invitation);
        draft.acceptInvitation = {loading: false, error: null};
        break;
      case CONSTANTS.ACCEPT_PERSONAL_NETWORK_INVITATION_FAIL:
        draft.acceptInvitation = {loading: false, error: action.error};
        break;

      case CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_REQUEST:
        draft.rejectInvitation = {loading: true, error: null};
        break;
      case CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_SUCCESS:
        draft.receivedInvitations = draft.receivedInvitations.map(invitation => invitation.id === action.data.id ? action.data : invitation);
        draft.rejectInvitation = {loading: false, error: null};
        break;
      case CONSTANTS.REJECT_PERSONAL_NETWORK_INVITATION_FAIL:
        draft.rejectInvitation = {loading: false, error: action.error};
        break;

      case CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_REQUEST:
        draft.favorite = {loading: true, error: null};
        break;
      case CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_SUCCESS:
        draft.users = draft.users.map(user => user.id === action.data.id ? action.data : user);
        draft.favorite = {loading: false, error: null};
        break;
      case CONSTANTS.SET_FAVORITE_PERSONAL_NETWORK_USER_FAIL:
        draft.favorite = {loading: false, error: action.error};
        break;

      default:
        break;
    }
  });

export default personalNetworkReducer;
