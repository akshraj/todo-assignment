import { ActionType } from "../action.types";

const users = [
  {
    id: 1,
    userId: "john123",
    name: "John Doe",
  },
];
export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const userFound =
        users?.find((user) => user.userId === userData.userId) || {};
      if (Object.keys(userFound).length > 0) {
        dispatch({ type: ActionType.USER_LOGIN_SUCCESS, payload: userFound });
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      dispatch({ type: ActionType.USER_LOGIN_ERROR, payload: err.message });
    }
  };
};
export const getTodos = (userId) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.TODOS_LIST, payload: userId });
  };
};

export const modalOpen = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.MODAL_OPEN });
  };
};
export const modalClose = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.MODAL_CLOSE });
  };
};
export const editModalOpen = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.EDIT_MODAL_OPEN });
  };
};
export const editModalClose = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.EDIT_MODAL_CLOSE });
  };
};
export const deleteModalOpen = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_MODAL_OPEN });
  };
};
export const deleteModalClose = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_MODAL_CLOSE });
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.CREATE_TODO_SUCCESS, payload: todo });
  };
};

export const clearAddTodo = () => {
  return (dispatch) => {
    dispatch({ type: ActionType.CLEAR_ADD_TODO_DATA });
  };
};

export const deleteTodo = (todoId) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.DELETE_TODO_SUCCESS, payload: todoId });
  };
};

export const editTodo = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.EDIT_TODO_SUCCESS, payload: data });
  };
};

export const completeTodo = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.COMPLETE_TODO_SUCCESS, payload: data });
  };
};

export const searchTodos = (searchText) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.SEARCH_TODO_SUCCESS, payload: searchText });
  };
};

export const getTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.GET_TODO_SUCCESS, payload: id });
  };
};
