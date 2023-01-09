import { ActionType } from "../action.types";

const initialState = {
  isOpen: false,
  isEditOpen: false,
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
    default:
      return state;
  }
};

export default reducer;
