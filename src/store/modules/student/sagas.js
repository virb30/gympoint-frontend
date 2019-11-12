import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import StudentTypes from './types';
import {
  getStudentsSuccess,
  getStudentsFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* getStudents({ payload }) {
  try {
    const { search } = payload;

    const response = yield call(api.get, 'students', {
      params: {
        q: search,
      },
    });

    yield put(getStudentsSuccess(response.data));
  } catch (err) {
    yield put(getStudentsFailure());
  }
}

export function* deleteStudent({ payload }) {
  const { id } = payload;
  try {
    yield call(api.delete, `/students/${id}`);
    yield put(deleteStudentSuccess(id));
  } catch (err) {
    console.tron.log(err);
    toast.error(
      'Ocorreu um erro ao processar sua solicitação, tente novamente'
    );
    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest(StudentTypes.GET_REQUEST, getStudents),
  takeLatest(StudentTypes.DELETE_REQUEST, deleteStudent),
]);
