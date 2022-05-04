import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo, login, requestParams } from "../../api/user";
import { RootState } from "..";
import { Res } from "../../api/user";
import { stateType, userInfo } from "../types";
import { cache } from "../../utils/localStorage";
const initialState: stateType = {
  userInfo: {
    userId: 0,
    username: "",
    role: ""
  },
  token: ""
};
export const loginAction = createAsyncThunk(
  "user/loginAction",
  async (payload: requestParams) => {
    const res = await login(payload);
    return res.data;
  }
);
export const getUserInfoAction = createAsyncThunk(
  "user/getUserInfo",
  async (payload: number) => {
    const res = await getUserInfo(payload);
    console.log(res);
    return {
      userId: 1,
      username: "test",
      role: "超级管理员"
    };
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
      cache.setItem("token", token);
    },
    "user/loginAction/rejected": (
      state: stateType,
      action: PayloadAction<any>
    ) => {
      console.log("登录失败");
    },
    "user/getUserInfoAction/fulfilled": (
      state,
      action: PayloadAction<userInfo>
    ) => {
      const { role, userId, username } = action.payload;
      state.userInfo = { role, userId, username };
    }
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const { updateUserInfo } = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
