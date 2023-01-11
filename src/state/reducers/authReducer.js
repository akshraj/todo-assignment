import { ActionType } from "../actions/action.types";

const initialState = {
  loggedInUser: null,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload,
        error: "",
      };
    case ActionType.USER_LOGIN_ERROR:
      return {
        ...state,
        loggedInUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
