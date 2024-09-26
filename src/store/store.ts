import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import authSlice from './authSlice';

//TODO: make it persist
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, authSlice);

// let store = createStore(persistedReducer);
// let persistor = persistStore(store);

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  // persistor,
  store,
};
