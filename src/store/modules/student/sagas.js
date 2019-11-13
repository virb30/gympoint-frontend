import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import StudentTypes from './types';
import * as StudentActions from './actions';

export function* getStudents({ payload }) {
  try {
    const { search } = payload;

    const response = yield call(api.get, 'students', {
      params: {
        q: search,
      },
    });

    yield put(StudentActions.getStudentsSuccess(response.data));
  } catch (err) {
    yield put(StudentActions.getStudentsFailure());
  }
}

export function* deleteStudent({ payload }) {
  const { id } = payload;
  try {
    yield call(api.delete, `/students/${id}`);
    yield put(StudentActions.deleteStudentSuccess(id));
  } catch (err) {
    console.tron.log(err);
    toast.error(
      'Ocorreu um erro ao processar sua solicitação, tente novamente'
    );
    yield put(StudentActions.deleteStudentFailure());
  }
}

export function* insertStudent({ payload }) {
  try {
    const response = yield call(api.post, '/students', {
      ...payload,
    });
    yield put(StudentActions.insertStudentSuccess({ ...response.data }));
    history.push('/students');
  } catch (err) {
    toast.error(
      'Não foi possível cadastrar o aluno, verifique e tente novamente'
    );
  }
}

export function* updateStudent({ payload }) {
  const { id, ...rest } = payload;
  try {
    const response = yield call(api.put, `/students/${id}`, {
      ...rest,
    });
    yield put(StudentActions.updateStudentSuccess({ ...response.data }));
    history.push('/students');
  } catch (err) {
    toast.error(
      'Não foi possível atualizar os dados do aluno, verifique e tente novamente'
    );
  }
}

export default all([
  takeLatest(StudentTypes.GET_REQUEST, getStudents),
  takeLatest(StudentTypes.DELETE_REQUEST, deleteStudent),
  takeLatest(StudentTypes.INSERT_REQUEST, insertStudent),
  takeLatest(StudentTypes.UPDATE_REQUEST, updateStudent),
]);
