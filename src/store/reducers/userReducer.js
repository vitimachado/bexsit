const INITIAL_STATE = {
    userId: null,
    username: null
  };
  
  function users(state = INITIAL_STATE, action) {
      
    switch (action.type) {
        case 'UPDATE_USER':
            //console.log('UPDATE_USER', action);
            return action;
      default:
        return state;
    }
  }
  
  const store = users;
  
  export default store;