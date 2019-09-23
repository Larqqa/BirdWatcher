import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import birdReducer from './reducers/birdReducer';

// CombineReducers is defined for use with other reducers
// If the application had a backend, here we could definefor example
// user reducers for user functions
const reducer = combineReducers({
  birds: birdReducer,
});

const store = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

export default store;