import userReducer from './user';
import walletReducer from './wallet';

const { combineReducers } = require('redux');

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves 'user' e 'wallet' no seu estado global

const rootReducer = combineReducers({
  userReducer,
  walletReducer,
});

export default rootReducer;
