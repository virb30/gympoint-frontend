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

export function deleteRegistrationRequest() {
  return {
    type: RegistrationTypes.DELETE_REQUEST,
  };
}
