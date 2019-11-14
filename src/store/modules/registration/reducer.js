import { produce } from 'immer';

import RegistrationTypes from './types';

const INITIAL_STATE = {
  registrations: [],
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case RegistrationTypes.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case RegistrationTypes.GET_SUCCESS: {
        draft.loading = false;
        draft.registrations = action.payload.registrations;
        break;
      }
      case RegistrationTypes.GET_FAILURE: {
        draft.loading = false;
        draft.registrations = [];
        break;
      }
      default:
    }
  });
}
