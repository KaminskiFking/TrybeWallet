// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, GET_COINS } from '../actions/index';

const INITIAL_STATE = {
  isLoading: false,
  currencies: '',
};

function coins(state = INITIAL_STATE, action) {
  console.log(action.data);
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case GET_COINS:
    return {
      ...state,
      isLoading: false,
      currencies: Object.keys(action.data),
    };
  default:
    return state;
  }
}

export default coins;
