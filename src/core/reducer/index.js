import { combineReducers } from '@reduxjs/toolkit';
import { UserReducer } from './User';




export const rootReducers = combineReducers({
  user: UserReducer,
});