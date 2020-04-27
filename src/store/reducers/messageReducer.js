const INITIAL_STATE = {
    data: [],
  };
  
  function messages(state = INITIAL_STATE, action) {
      
    switch (action.type) {
        case 'SAVE_MESSAGE':
            //console.log('SAVE_MESSAGE', action);
            return action;
        case 'LOADING_START':
            //console.log('wwwwwwwwwwwwwwww LOADING_START', action);
            return { loading: true };
        case 'LOADING_STOP':
            //console.log('wwwwwwwwwwwwwwwww LOADING_STOP', action);
            return { loading: false };
      default:
        return state;
    }
  }
  
  const store = messages;
  
  export default store;
