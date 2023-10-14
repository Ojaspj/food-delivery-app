// sampleReducer.js

// Define your initial state
const initialState = {
    // Define your initial state properties here
    data: [],
    isLoading: false,
    error: null,
  };
  
  // Define action types (constants)
  const SAMPLE_ACTION = 'SAMPLE_ACTION';
  const SAMPLE_ACTION_SUCCESS = 'SAMPLE_ACTION_SUCCESS';
  const SAMPLE_ACTION_FAILURE = 'SAMPLE_ACTION_FAILURE';
  
  // Define the reducer function
  const sampleReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAMPLE_ACTION:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case SAMPLE_ACTION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload, // Update your state with data from the action
        };
      case SAMPLE_ACTION_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error, // Update your state with the error message
        };
      default:
        return state;
    }
  };
  
  // Define action creators
  export const sampleAction = () => ({
    type: SAMPLE_ACTION,
  });
  
  export const sampleActionSuccess = (data) => ({
    type: SAMPLE_ACTION_SUCCESS,
    payload: data,
  });
  
  export const sampleActionFailure = (error) => ({
    type: SAMPLE_ACTION_FAILURE,
    error,
  });
  
  export default sampleReducer;
  