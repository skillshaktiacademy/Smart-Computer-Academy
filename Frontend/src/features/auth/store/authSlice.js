import { createSlice } from "@reduxjs/toolkit";

// The access token is intentionally NOT persisted to localStorage (that would
// expose it to XSS). It lives in memory only; auth also flows through the
// httpOnly cookie, and the axios interceptor silently refreshes the token
// after a page reload. Only non-sensitive `user` data is persisted so the UI
// can restore role/session state.
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: null,
  isAuthenticated: !!localStorage.getItem("user"),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (token) {
        // in-memory only — deliberately not written to localStorage
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setLoading, setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
