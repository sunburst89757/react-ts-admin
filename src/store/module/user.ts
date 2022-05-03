import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, requestParams } from "../../api/test";
interface res {
  payload: userInfo;
}
interface userInfo {
  userId: number;
  role: string;
  username: string;
}
interface stateType {
  userInfo: userInfo;
  status: "successed" | "error" | "pending" | "idle";
  token: string;
}
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
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, { payload }: res) => {
      const { userId, role, username } = payload;
      state.userInfo.role = role;
      state.userInfo.userId = userId;
      state.userInfo.username = username;
    }
  },
  extraReducers: {
    "user/loginAction/pending": (state: stateType, action: any) => {
      state.status = "pending";
      console.log("发送状态");
    },
    "user/loginAction/fullfilled": (state: stateType, action: any) => {
      state.status = "successed";
      console.log("成功", action.payload);
    }
  }
});

export const userReducer = userSlice.reducer;
