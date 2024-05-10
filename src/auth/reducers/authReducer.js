import { types } from "../types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      };
    case types.logout:
      return {
        logged: false
      };
    case types.error:
      return {
        logged: false,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
}