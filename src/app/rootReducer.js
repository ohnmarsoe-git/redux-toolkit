import { combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice';
import { postsApiSlice } from '../features/api/PostsApiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [postsApiSlice.reducerPath]: postsApiSlice.reducer,
});

export default rootReducer;