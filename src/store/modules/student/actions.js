import StudentTypes from './types';

export function getStudentsRequest(search) {
  return {
    type: StudentTypes.GET_REQUEST,
    payload: { search },
  };
}

export function getStudentsSuccess(students) {
  return {
    type: StudentTypes.GET_SUCCESS,
    payload: { students },
  };
}

export function getStudentsFailure() {
  return {
    type: StudentTypes.GET_FAILURE,
  };
}

export function deleteStudentRequest(id) {
  return {
    type: StudentTypes.DELETE_REQUEST,
    payload: { id },
  };
}

export function deleteStudentSuccess(id) {
  return {
    type: StudentTypes.DELETE_SUCCESS,
    payload: { id },
  };
}

export function deleteStudentFailure() {
  return {
    type: StudentTypes.DELETE_FAILURE,
  };
}
