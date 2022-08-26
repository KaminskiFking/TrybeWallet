// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = [];

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EMAIL':
    return [...state, action.value];
  default:
    return state;
  }
}

export default user;
