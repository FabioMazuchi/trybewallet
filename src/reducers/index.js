import user from './user';
import wallet from './wallet';

const { combineReducers } = require('redux');

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves 'user' e 'wallet' no seu estado global

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
