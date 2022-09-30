// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, REMOVE_EXPENSE, GET_COINS,
  EDIT_EXPENSE, EDITOR_ACTIVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COINS:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDITOR_ACTIVE:
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action.id,
    };
  default:
    return state;
  }
};

export default wallet;
