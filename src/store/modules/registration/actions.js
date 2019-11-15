import RegistrationTypes from './types';

export function getRegistrationsRequest() {
  return {
    type: RegistrationTypes.GET_REQUEST,
  };
}
export function getRegistrationsSuccess(registrations) {
  return {
    type: RegistrationTypes.GET_SUCCESS,
    payload: { registrations },
  };
}
export function getRegistrationsFailure() {
  return {
    type: RegistrationTypes.GET_FAILURE,
  };
}

export function deleteRegistrationRequest(id) {
  return {
    type: RegistrationTypes.DELETE_REQUEST,
    payload: { id },
  };
}

export function deleteRegistrationSuccess(id) {
  return {
    type: RegistrationTypes.DELETE_SUCCESS,
    payload: { id },
  };
}
export function deleteRegistrationFailure() {
  return {
    type: RegistrationTypes.DELETE_FAILURE,
  };
}
