import { all, takeLatest, call, put } from 'redux-saga/effects';

import RegistrationTypes from './types';
import * as RegistrationActions from './actions';

import api from '~/services/api';

export function* getRegistrations() {
  try {
    const response = yield call(api.get, '/registrations');
    yield put(RegistrationActions.getRegistrationsSuccess(response.data));
  } catch (err) {
    yield put(RegistrationActions.getRegistrationsFailure());
  }
}

export default all([
  takeLatest(RegistrationTypes.GET_REQUEST, getRegistrations),
]);
