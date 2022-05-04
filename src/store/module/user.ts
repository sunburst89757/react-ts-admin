import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, requestParams } from "../../api/test";
import { RootState } from "..";
import { Res } from "../../api/test";
import { stateType, userInfo } from "../types";

const initialState: stateType = {
  userInfo: {
    userId: 10,
    username: "cy",
    role: "test"
  },
  status: "idle",
  token: ""
};
export const loginAction = createAsyncThunk(
  "user/loginAction",
  async (payload: requestParams) => {
    const res = await login(payload);
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
    }
  },
  extraReducers: {
    "user/loginAction/pending": (
      state: stateType,
      action: PayloadAction<any>
    ) => {
      state.status = "pending";
      console.log("发送状态");
    },
    "user/loginAction/fulfilled": (
      state: stateType,
      action: PayloadAction<Res>
    ) => {
      state.status = "successed";
      state.token = action.payload.token;
      console.log("成功", action.payload);
    }
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const { updateUserInfo } = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
