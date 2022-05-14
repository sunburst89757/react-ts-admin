import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { tabsReducer } from "./module/tabs";
import { userReducer } from "./module/user";
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    tabs: tabsReducer
  })
);
export const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
