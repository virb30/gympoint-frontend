import PlanTypes from './types';

export function getPlansRequest(search) {
  return {
    type: PlanTypes.GET_REQUEST,
    payload: { search },
  };
}

export function getPlansSuccess(plans) {
  return {
    type: PlanTypes.GET_SUCCESS,
    payload: { plans },
  };
}

export function getPlansFailure() {
  return {
    type: PlanTypes.GET_FAILURE,
  };
}

export function deletePlanRequest(id) {
  return {
    type: PlanTypes.DELETE_REQUEST,
    payload: { id },
  };
}

export function deletePlanSuccess(id) {
  return {
    type: PlanTypes.DELETE_SUCCESS,
    payload: { id },
  };
}

export function deletePlanFailure() {
  return {
    type: PlanTypes.DELETE_FAILURE,
  };
}

export function insertPlanRequest(title, duration, price) {
  return {
    type: PlanTypes.INSERT_REQUEST,
    payload: {
      title,
      duration,
      price,
    },
  };
}

export function insertPlanSuccess({ id, title, duration, price }) {
  return {
    type: PlanTypes.INSERT_SUCCESS,
    payload: { id, title, duration, price },
  };
}

export function insertPlanFailure() {
  return {
    type: PlanTypes.INSERT_FAILURE,
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: PlanTypes.UPDATE_REQUEST,
    payload: { id, title, duration, price },
  };
}

export function updatePlanSuccess({ id, title, duration, price }) {
  return {
    type: PlanTypes.UPDATE_SUCCESS,
    payload: { id, title, duration, price },
  };
}

export function updatePlanFailure() {
  return {
    type: PlanTypes.UPDATE_FAILURE,
  };
}
