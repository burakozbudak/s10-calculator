import {
  APPLY_NUMBER,
  CHANGE_OPERATION,
  CLEAR_DISPLAY,
  RESULT,
  MEMORY_ADD,
  MEMORY_RECALL,
  MEMORY_CLEAR,
} from "./actions.jsx";

export const initialState = {
  total: 0,
  operation: "+",
  memory: 0,
  next: null,
};

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "*":
      return num1 * num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    default:
      return;
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case APPLY_NUMBER:
      return {
        ...state,
        total:
          state.operation === "="
            ? action.payload
            : calculateResult(state.total, action.payload, state.operation),
      };

    case CHANGE_OPERATION:
      return {
        ...state,
        operation: action.payload,
        memory: state.total,
        total: 0,
      };

    case CLEAR_DISPLAY:
      return {
        ...state,
        total: 0,
        operation: "+",
      };

    case RESULT:
      return {
        ...state,
        total: calculateResult(state.total, state.total, state.operation),
        operation: "=",
      };

    case MEMORY_ADD:
      return {
        ...state,
        memory: state.total,
      };

    case MEMORY_RECALL:
      return {
        ...state,
        total: state.memory,
      };

    case MEMORY_CLEAR:
      return {
        ...state,
        memory: 0,
      };

    default:
      return state;
  }
};
