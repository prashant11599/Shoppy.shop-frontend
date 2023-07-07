import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cart','order','auth']
}

const persistedReducer=persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  // reducer: {
  //   auth: authReducer,
  //   product: productReducer,
  //   cart: cartReducer
  // },
  reducer:persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor=persistStore(store);














