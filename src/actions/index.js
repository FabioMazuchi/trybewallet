export const LOGAR = 'LOGAR';
export const ADD_DESPESA = 'ADD_DESPESA';
export const REMOVE_DESPESA = 'REMOVE_DESPESA';
export const EDITA_DESPESA_INIT = 'EDITA_DESPESA_INIT';
export const EDITA_DESPESA_SUCCESS = 'EDITA_DESPESA_SUCCESS';
export const REQUEST_MOEDAS = 'REQUEST_MOEDAS';
export const GET_MOEDAS = 'GET_MOEDAS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export function logar(email) {
  return { type: LOGAR, email };
}

export function addDespesa(despesa) {
  return { type: ADD_DESPESA, despesa };
}

export function removeDespesa(id) {
  return { type: REMOVE_DESPESA, id };
}

export function editaDespesaInit(despesa) {
  return { type: EDITA_DESPESA_INIT, despesa };
}

export function editaDespesaSuccess(despesaeditada) {
  return { type: EDITA_DESPESA_SUCCESS, despesaeditada };
}

function requestMoedas() {
  return { type: REQUEST_MOEDAS };
}

function getMoedas(json) {
  return { type: GET_MOEDAS, payload: json };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchMoedas() {
  return (dispatch) => {
    dispatch(requestMoedas());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(getMoedas(json)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
