import { call, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import AuthTypes from './types';
import { signInSuccess, signInFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/students');
  } catch (err) {
    toast.error('Usuário ou senha inválido');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
