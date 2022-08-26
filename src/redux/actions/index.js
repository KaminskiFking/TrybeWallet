// Coloque aqui suas actions
export const addAssignment = (value) => ({ type: 'ADD_EMAIL', value });

export const REQUEST_API = 'REQUEST_API';
export const GET_COINS = 'GET_PICTURE';

export const requestAPI = () => ({ type: REQUEST_API });

export const getCoins = (data) => ({ type: GET_COINS, data });

export function fetchAPI() {
  // Desenvolva aqui o código da action assíncrona
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      delete data.USDT;
      dispatch(getCoins(data));
    } catch (error) {
      console.log('e');
    }
  };
}
