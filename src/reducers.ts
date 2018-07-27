import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import redux from './redux';

const reducers: object = {
  router: routerReducer,
  ...redux,
};

export default combineReducers(reducers);
