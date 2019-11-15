import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import RegistrationTypes from './types';
import * as RegistrationActions from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* getRegistrations() {
  try {
    const response = yield call(api.get, '/registrations');
    yield put(RegistrationActions.getRegistrationsSuccess(response.data));
  } catch (err) {
    yield put(RegistrationActions.getRegistrationsFailure());
  }
}

export function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/registrations/${id}`);
    yield put(RegistrationActions.deleteRegistrationSuccess(id));
    history.push('/registrations');
  } catch (err) {
    toast.error('Erro ao excluir a Matrícula, tente novamente');
    yield put(RegistrationActions.deleteRegistrationFailure());
  }
}

export default all([
  takeLatest(RegistrationTypes.GET_REQUEST, getRegistrations),
  takeLatest(RegistrationTypes.DELETE_REQUEST, deleteRegistration),
]);
