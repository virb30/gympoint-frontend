import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import student from './student/sagas';
import plan from './plan/sagas';

export default function* rootSaga() {
  yield all([auth, student, plan]);
}
