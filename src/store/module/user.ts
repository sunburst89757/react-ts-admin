import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { login, requestParams } from "../../api/user";
import { RootState } from "..";
import { Res } from "../../api/user";
import { stateType, userInfo } from "../types";
import { cache } from "../../utils/localStorage";
interface IloginType extends requestParams {
  navigate: NavigateFunction;
}
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
export const loginAction = createAsyncThunk(
  "user/loginAction",
  async (payload: IloginType) => {
    const { username, password, navigate } = payload;
    const res = await login({
      username,
      password
    });
    navigate("/dashboard");
    return res.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<userInfo>) => {
      const { userId, role, username } = action.payload;
      state.userInfo.role = role;
      state.userInfo.userId = userId;
      state.userInfo.username = username;
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
  },
  extraReducers: {
    "user/loginAction/fulfilled": (
      state: stateType,
      action: PayloadAction<Res>
    ) => {
      const { token } = action.payload;
      state.token = token;
      state.userInfo.userId = action.payload.userId;
      // 用户角色本来应该从action.payload里传递，新项目需要接口更改
      state.userInfo.role = "super-admin";
      state.userInfo.username = action.payload.nickName;
      cache.setItem("token", token);
    },
    "user/loginAction/rejected": (
      state: stateType,
      action: PayloadAction<any>
    ) => {
      console.log("登录失败");
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
