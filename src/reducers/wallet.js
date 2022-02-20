import {
  ADD_DESPESA,
  REQUEST_MOEDAS,
  GET_MOEDAS,
  FAILED_REQUEST,
  REMOVE_DESPESA,
  EDITA_DESPESA_INIT,
  EDITA_DESPESA_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
  isFetching: false,
  expense: {},
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_DESPESA:
    return { ...state, expenses: [...state.expenses, action.despesa] };
  case REMOVE_DESPESA:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDITA_DESPESA_INIT:
    return {
      ...state,
      expense: action.despesa,
      isEditing: true,
    };
  case EDITA_DESPESA_SUCCESS:
    return {
      ...state,
      expenses: action.despesaeditada,
      isEditing: false,
    };
  case REQUEST_MOEDAS:
    return { ...state, isFetching: true };
  case GET_MOEDAS:
    return { ...state, exchangeRates: action.payload, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, isFetching: false };
  default:
    return state;
  }
};

export default wallet;
