import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const makeLogin = createAsyncThunk(
  "auth/makeLogin",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:8085/user/login", {
      email,
      password,
    });
    console.log("Login response", response);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { loginSuccess: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeLogin.fulfilled, (state, action) => {
      state.loginSuccess = true;
    });
  },
});

export default authSlice.reducer;
