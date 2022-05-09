import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type tabObject = {
  title: string;
  key: string;
  /* key设置路由 title就是标题 */
};
type tabsState = {
  tabs: tabObject[];
  activeTab: string;
  menuActive: string[];
};
const initialState: tabsState = {
  tabs: [
    {
      key: "/dashboard",
      title: "首页"
    }
  ],
  activeTab: "/dashboard",
  menuActive: ["dashboard"]
};
const selectMenuActive = (key: string): string[] => {
  const arr: any[] = key.split("/");
  arr.shift();
  return arr;
};
const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<tabObject>) => {
      state.tabs.push(action.payload);
      state.activeTab = action.payload.key;
      state.menuActive = selectMenuActive(action.payload.key);
    },
    removeTab: (state, action: PayloadAction<number>) => {
      state.tabs.splice(action.payload, 1);
    },
    changeTabActive: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.menuActive = selectMenuActive(action.payload);
    },
    resetInitialState: (state) => {
      // 不能直接initialState 赋值给state
      const { tabs, activeTab, menuActive } = initialState;
      state.tabs = tabs;
      state.activeTab = activeTab;
      state.menuActive = menuActive;
    }
  }
});

export const tabsReducer = tabSlice.reducer;
export const { addTab, removeTab, changeTabActive, resetInitialState } =
  tabSlice.actions;
