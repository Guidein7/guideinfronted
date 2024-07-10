import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import loginSlice from '../JobSeeker/Slices/loginSlice';
import employeeLoginSlice from '../Employee/slices/employeeLoginSlice';
import AdminLoginSlice from '../Admin/slices/AdminLoginSlice';

// Combine your reducers into a single rootReducer
const rootReducer = combineReducers({
  log: loginSlice,
  emplog: employeeLoginSlice,
  adminlog:AdminLoginSlice

});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist specific reducers to be persisted
  // whitelist: ['log', 'emplog']
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['register', 'rehydrate'],
      },
    }),
});

// Create a persistor object for persisting the store
export const persistor = persistStore(store);
