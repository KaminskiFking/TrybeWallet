// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, GET_COINS } from '../actions/index';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  total: 0,
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
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case 'ADD_TOTAL':
    return { ...state, total: parseFloat((state.total + action.value).toFixed(2)) };
  default:
    return state;
  }
}

export default coins;
