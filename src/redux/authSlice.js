import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        _id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.token = action.payload.token;
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
