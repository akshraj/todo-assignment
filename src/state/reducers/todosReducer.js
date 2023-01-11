import { ActionType } from "../actions/action.types";

const initialState = {
  loading: false,
  error: null,
  data: [],
  deleteTodoLoading: false,
  deleteTodoData: null,
  deleteTodoError: false,
  completeTodoLoading: false,
  completeTodoSuccess: null,
  completeTodoError: false,
  searchData: [],
  addTodoLoading: false,
  addTodoSuccess: null,
  addTodoError: null,
  todoLoading: false,
  todoSuccess: null,
  todoError: null,
  matched: [],
  todo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TODOS_LIST:
      const userId = action.payload;
      const todosByUserId = state.data.filter((todo) => todo.userId === userId);
      return {
        ...state,
        data: todosByUserId,
      };
    case ActionType.DELETE_TODO_SUCCESS:
      return {
        ...state,
        data: state.data.filter((d) => d.id !== action.payload),
      };
    case ActionType.SEARCH_TODO_SUCCESS:
      const matchedData = state.data.filter((d) =>
        d.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        matched: matchedData,
      };
    case ActionType.CREATE_TODO_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case ActionType.EDIT_TODO_SUCCESS:
      return {
        ...state,
        data: state.data.map((el) =>
          el.id === action.payload.id
            ? { ...el, title: action.payload.title }
            : el
        ),
      };
    case ActionType.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        data: state.data.map((el) =>
          el.id === action.payload.id
            ? { ...el, isCompleted: action.payload.isChecked }
            : el
        ),
      };
    case ActionType.GET_TODO_SUCCESS:
      return {
        ...state,
        todo: state.data.find((el) => el.id === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
