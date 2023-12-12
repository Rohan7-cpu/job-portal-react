// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'; // Create your reducers and combine them

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
