import { combineReducers } from 'redux';
import dataReducer from './dataReducer'; // Import your dataReducer
// Import other reducers if you have them

const rootReducer = combineReducers({
  data: dataReducer, // Assign your dataReducer under a 'data' key
  // Add other reducers here if you have them
});

export default rootReducer;
