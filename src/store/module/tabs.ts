import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type tabObject = {
  title: string;
  key: string;
  /* key设置路由 title就是标题 */
};
type tabsState = {
  tabs: tabObject[];
  activeTab: string;
};
const initialState: tabsState = {
  tabs: [
    {
      key: "/dashboard",
      title: "首页"
    }
  ],
  activeTab: "/dashboard"
};
const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<tabObject>) => {
      state.tabs.push(action.payload);
    },
    removeTab: (state, action: PayloadAction<number>) => {
      state.tabs.splice(action.payload, 1);
    },
    changeTabActive: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetInitialState: (state) => {
      // 不能直接initialState 赋值给state
      const { tabs, activeTab } = initialState;
      state.tabs = tabs;
      state.activeTab = activeTab;
    }
  }
});

export const tabsReducer = tabSlice.reducer;
export const { addTab, removeTab, changeTabActive, resetInitialState } =
  tabSlice.actions;
