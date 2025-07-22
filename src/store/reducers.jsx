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
  display: "0", // Ekran değeri için - bu TotalDisplay'de gösterilecek
  waitingForNewNumber: false, // Yeni sayı girişi bekleniyor mu?
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
      return num2 !== 0 ? num1 / num2 : num1; // Sıfıra bölme kontrolü
    default:
      return num2; // Geçersiz işlem durumunda ikinci sayıyı döndür
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
        display: action.payload.toString(),
        waitingForNewNumber: false,
      };

    case CHANGE_OPERATION:
      return {
        ...state,
        operation: action.payload,
        memory: state.total,
        total: 0,
        waitingForNewNumber: true, // Yeni sayı girişi bekleniyor
        display: "0", // Ekranı sıfırla
      };

    case CLEAR_DISPLAY:
      return {
        ...state,
        total: 0,
        operation: "null",
        memory: 0,
        next: null,
        display: "0", // Ekranı sıfırla
        waitingForNewNumber: false, // Yeni sayı girişi beklenmiyor
      };

    case RESULT:
      return {
        ...state,
        total: calculateResult(state.total, state.total, state.operation),
        operation: "=",
      };

    case MEMORY_ADD:
      if (state.operation) {
        const result = calculateResult(
          state.total,
          Number(state.display),
          state.operation
        );
        return {
          ...state,
          total: result,
          operation: "null",
          display: result.toString(),
          waitingForNewNumber: true, // Yeni sayı girişi bekleniyor
        };
      }
      return state;

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
