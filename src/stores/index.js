import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
// STORES
import users from './users'
// END OF STORES

const reducers = combineReducers({
  // REDUCERS
  users,
// END OF REDUCERS
});

const middlewares = [
  promiseMiddleware,
  thunk
];

if (process.env.REACT_APP_ENV !== 'production') {
  // Redux logger MUST BE the last middleware
  const {logger} = require('redux-logger');
  middlewares.push(logger)
}

const composedMiddlewares = applyMiddleware(...middlewares);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(composedMiddlewares));

export default store
