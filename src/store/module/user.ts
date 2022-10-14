import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Res } from "../../api/user";
import { cache } from "../../utils/localStorage";
import { stateType } from "../types";
const initialState: stateType = {
  userInfo: {
    userId: 0,
    username: "",
    role: ""
  },
  token: "",
  isShowReloginModal: false,
  datedNum: 0
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Res>) => {
      const { token, userId, username } = action.payload;
      state.token = token;
      state.userInfo.userId = userId;
      // 用户角色本来应该从action.payload里传递，新项目需要接口更改
      state.userInfo.role = "super-admin";
      state.userInfo.username = username;
      cache.setItem("token", token);
    },
    changeisShowReloginModal: (state) => {
      state.isShowReloginModal = !state.isShowReloginModal;
    },
    incrementDatedNum: (state) => {
      state.datedNum = state.datedNum + 1;
    },
    resetDatedNum: (state) => {
      state.datedNum = 0;
    },
    resetInitialState: (state) => {
      const { userInfo, datedNum, isShowReloginModal, token } = initialState;
      state.userInfo = userInfo;
      state.datedNum = datedNum;
      state.isShowReloginModal = isShowReloginModal;
      state.token = token;
    }
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const {
  updateUserInfo,
  changeisShowReloginModal,
  incrementDatedNum,
  resetDatedNum,
  resetInitialState
} = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
