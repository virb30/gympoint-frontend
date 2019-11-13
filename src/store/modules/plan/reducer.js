import { produce } from 'immer';

import PlanTypes from './types';

const INITIAL_STATE = {
  loading: false,
  plans: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case PlanTypes.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case PlanTypes.GET_SUCCESS: {
        draft.plans = action.payload.plans;
        draft.loading = false;
        break;
      }
      case PlanTypes.GET_FAILURE: {
        draft.loading = false;
        draft.plans = [];
        break;
      }
      case PlanTypes.DELETE_SUCCESS: {
        const { plans } = state;
        const { id } = action.payload;
        draft.plans = plans.filter(plan => plan.id !== id);
        break;
      }
      case PlanTypes.INSERT_REQUEST: {
        draft.loading = true;
        break;
      }
      case PlanTypes.UPDATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case PlanTypes.INSERT_SUCCESS: {
        const newPlan = action.payload;
        draft.plans = [...state.plans, newPlan];
        break;
      }
      case PlanTypes.UPDATE_SUCCESS: {
        const { id, ...rest } = action.payload;
        draft.plans = state.plans.map(plan => {
          if (plan.id === id) {
            return { ...rest };
          }
          return plan;
        });
        break;
      }
      default:
    }
  });
}
