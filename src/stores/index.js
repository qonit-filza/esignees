import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
//   import thunk from 'redux-thunk';
import pdfReducer from './reducers/pdfReducer';

const store = createStore(pdfReducer);

export default store;
