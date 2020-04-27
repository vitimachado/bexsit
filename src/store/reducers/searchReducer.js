const INITIAL_STATE = {
  data: [],
};

function courses(state = INITIAL_STATE, action) {
    
  switch (action.type) {
    case 'UPDATE_LIST':
      //console.log('UPDATE_LIST', action);
      return action;
    case 'CLEAR_SEARCH':
      //console.log('CLEAR_SEARCH');
      return action;
    case 'REDIRECT':
      //console.log('REDIRECT');
      return action;
    default:
      return state;
  }
}

const store = courses;

export default store;
