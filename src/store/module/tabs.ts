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
    removeTab: (state, action: PayloadAction<string>) => {
      const index = state.tabs.findIndex((tab) => tab.key === action.payload);
      console.log(index);
      state.tabs.splice(index, 1);
      // 删除第一个
      if (index === 0) {
        // 第一个元素也是最后一个元素
        if (state.tabs.length === 0) {
          state.tabs.push({
            key: "/dashboard",
            title: "首页"
          });
          state.activeTab = "/dashboard";
          state.menuActive = ["dashboard"];
        } else {
          // 第一个元素不是最后一个元素
          state.activeTab = state.tabs[0].key;
          state.menuActive = selectMenuActive(state.tabs[0].key);
        }
      } else {
        // 删除中间的tab
        state.activeTab = state.tabs[index - 1].key;
        state.menuActive = selectMenuActive(state.tabs[index - 1].key);
      }
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
