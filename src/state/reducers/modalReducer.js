import { ActionType } from "../actions/action.types";

const initialState = {
  isOpen: false,
  isEditOpen: false,
  isDeleteOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.MODAL_OPEN:
      return {
        isOpen: true,
      };
    case ActionType.MODAL_CLOSE:
      return {
        isOpen: false,
      };
    case ActionType.EDIT_MODAL_OPEN:
      return {
        isEditOpen: true,
      };
    case ActionType.EDIT_MODAL_CLOSE:
      return {
        isEditOpen: false,
      };
    case ActionType.DELETE_MODAL_OPEN:
      return {
        isDeleteOpen: true,
      };
    case ActionType.DELETE_MODAL_CLOSE:
      return {
        isDeleteOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
