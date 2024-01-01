import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

import { apiSlice } from './api/apiSlice';
import { postsApiSlice } from '../features/api/PostsApiSlice';
// import authReducer from '../features/auth/authSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer( persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware).concat(postsApiSlice.middleware),
  devTools: true
})

const persistor = persistStore(store);

export {store, persistor}