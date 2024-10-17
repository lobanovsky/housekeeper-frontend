import { configureStore } from '@reduxjs/toolkit';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from 'store/reducers/auth';
import { storeMiddleware } from './middleware';

const persistConfig = {
  key: 'housekeeper',
  storage,
  whitelist: ['user', 'isUserLoggedIn']
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const appStore = configureStore({
  reducer: {
    auth: persistedAuthReducer
  },
  middleware: storeMiddleware,
  devTools: process.env.NODE_ENV !== 'production'
});

export type StoreState = ReturnType<typeof appStore.getState>;

export const persistor = persistStore(appStore);
export default appStore;
