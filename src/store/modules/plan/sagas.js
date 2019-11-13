import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import PlanTypes from './types';
import * as PlanActions from './actions';

export function* getPlans({ payload }) {
  try {
    const { search } = payload;

    const response = yield call(api.get, 'plans', {
      params: {
        q: search,
      },
    });

    yield put(PlanActions.getPlansSuccess(response.data));
  } catch (err) {
    yield put(PlanActions.getPlansFailure());
  }
}

export function* deletePlan({ payload }) {
  const { id } = payload;
  try {
    yield call(api.delete, `/plans/${id}`);
    yield put(PlanActions.deletePlanSuccess(id));
  } catch (err) {
    toast.error(
      'Ocorreu um erro ao processar sua solicitação, tente novamente'
    );
    yield put(PlanActions.deletePlanFailure());
  }
}

export function* insertPlan({ payload }) {
  try {
    const response = yield call(api.post, '/plans', {
      ...payload,
    });
    yield put(PlanActions.insertPlanSuccess({ ...response.data }));
    history.push('/plans');
  } catch (err) {
    toast.error(
      'Não foi possível cadastrar o plano, verifique e tente novamente'
    );
  }
}

export function* updatePlan({ payload }) {
  const { id, ...rest } = payload;
  try {
    const response = yield call(api.put, `/plans/${id}`, {
      ...rest,
    });
    yield put(PlanActions.updatePlanSuccess({ ...response.data }));
    history.push('/plans');
  } catch (err) {
    toast.error(
      'Não foi possível atualizar os dados do plano, verifique e tente novamente'
    );
  }
}

export default all([
  takeLatest(PlanTypes.GET_REQUEST, getPlans),
  takeLatest(PlanTypes.DELETE_REQUEST, deletePlan),
  takeLatest(PlanTypes.INSERT_REQUEST, insertPlan),
  takeLatest(PlanTypes.UPDATE_REQUEST, updatePlan),
]);
