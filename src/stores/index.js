import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import pdfReducer from './reducers/pdfReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  users: userReducer,
  documents: pdfReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
