import { configureStore } from "@reduxjs/toolkit";
import { tabsReducer } from "./module/tabs";
import { userReducer } from "./module/user";
export const store = configureStore({
  reducer: {
    user: userReducer,
    tabs: tabsReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
