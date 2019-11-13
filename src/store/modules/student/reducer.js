import { produce } from 'immer';

import StudentTypes from './types';

const INITIAL_STATE = {
  loading: false,
  students: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case StudentTypes.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case StudentTypes.GET_SUCCESS: {
        draft.students = action.payload.students;
        draft.loading = false;
        break;
      }
      case StudentTypes.GET_FAILURE: {
        draft.loading = false;
        draft.students = [];
        break;
      }
      case StudentTypes.DELETE_SUCCESS: {
        const { students } = state;
        const { id } = action.payload;
        draft.students = students.filter(student => student.id !== id);
        break;
      }
      case StudentTypes.INSERT_REQUEST: {
        draft.loading = true;
        break;
      }
      case StudentTypes.UPDATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case StudentTypes.INSERT_SUCCESS: {
        const newStudent = action.payload;
        draft.students = [...state.students, newStudent];
        break;
      }
      case StudentTypes.UPDATE_SUCCESS: {
        const { id, ...rest } = action.payload;
        draft.students = state.students.map(student => {
          if (student.id === id) {
            return { ...rest };
          }
          return student;
        });
        break;
      }
      default:
    }
  });
}
