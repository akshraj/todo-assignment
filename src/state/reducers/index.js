import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import todosReducer from "./todosReducer";
import modalReducer from "./modalReducer";

const persistConfig = {
  key: "userCreds",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);

const reducers = combineReducers({
  auth: authReducer,
  todos: persistedReducer,
  modalState: modalReducer,
});

export default reducers;
