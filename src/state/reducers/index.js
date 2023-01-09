import { combineReducers } from "redux";

import authReducer from "./authReducer";
import todosReducer from "./todosReducer";
import modalReducer from "./modalReducer";

const reducers = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  modalState:modalReducer,
});

export default reducers;
