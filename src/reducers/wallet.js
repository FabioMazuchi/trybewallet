import { ADD_DESPESA, REQUEST_MOEDAS, GET_MOEDAS, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_DESPESA:
    return { ...state, expenses: [...state.expenses, action.despesa] };
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
