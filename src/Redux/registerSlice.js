// registrationReducer.js
import { createSlice } from "@reduxjs/toolkit";
// registrationThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8085/user/signup", {
        email,
        password,
        username,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registrationReducer = createSlice({
  name: "registration",
  initialState: {
    successMessage: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.successMessage = "Registration successful! You can now login.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = "Registration failed. Please try again.";
        state.successMessage = "";
      });
  },
});

export default registrationReducer.reducer;
