import { produce } from 'immer';
import AuthTypes from './types';

const INITIAL_STATE = {
  loading: false,
  token: null,
  user: null,
  signed: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case AuthTypes.SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.token = null;
        draft.user = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
