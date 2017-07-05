import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import CurrentUserReducer from './CurrentUserReducer';
import DistilleriesReducer from './DistilleriesReducer';
import Effects from '../effects';

export default createStore(
  combineReducers({
    currentUser: CurrentUserReducer,
    distilleries: DistilleriesReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects)),
);
