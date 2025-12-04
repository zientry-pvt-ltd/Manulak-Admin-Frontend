import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/store/authSlice";
import orderFormReducer from "@/features/orders/store/order-form-slice";
import ordersReducer from "@/features/orders/store/order-slice";
import productsReducer from "@/features/products/store/product-slice";
import appConfigReducer from "@/features/settings/store/appConfigSlice";
import stockReducer from "@/features/stock/store/stock-slice";
import { api } from "@/services";

const rootReducer = combineReducers({
  auth: authReducer,
  appConfig: appConfigReducer,
  orderForm: orderFormReducer,
  products: productsReducer,
  orders: ordersReducer,
  stock: stockReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["appConfig"], // Only persist `app` slice
  blacklist: [], // Add slices to exclude here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
