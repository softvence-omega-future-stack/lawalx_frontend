import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
}

// Helper to decode user from token
const getUserFromToken = (token: string): User | null => {
  try {
    const decoded: any = jwtDecode(token);
    // Matching the payload structure from the image: userId, role, userEmail
    return {
      id: decoded.userId || decoded.id || decoded.sub || "1",
      email: decoded.userEmail || decoded.email || "",
      role: decoded.role || "user",
      name: decoded.name || decoded.userName || "",
    };
  } catch (e) {
    return null;
  }
};

// Helper to get initial state from cookies
const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, token: null, refreshToken: null, isHydrated: false };
  }

  const token = Cookies.get("token") || null;
  const refreshToken = Cookies.get("refreshToken") || null;
  const user = token ? getUserFromToken(token) : null;

  return {
    user,
    token,
    refreshToken,
    isHydrated: true,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user?: User; token: string; refreshToken: string }>
    ) => {
      const { token, refreshToken } = action.payload;
      
      // Automatically decode from token to ensure role/info are accurate as per JWT
      const decodedUser = getUserFromToken(token);
      
      state.token = token;
      state.refreshToken = refreshToken;
      state.user = decodedUser || action.payload.user || null;
      state.isHydrated = true;

      // Save tokens to cookies (Secure & SameSite for security)
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set("refreshToken", refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      // Remove cookies
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
        state.token = action.payload.token;
        state.user = getUserFromToken(action.payload.token);
        Cookies.set("token", action.payload.token, { expires: 7, secure: true, sameSite: 'strict' });
    }
  },
});

export const { setUser, logout, setToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectIsHydrated = (state: { auth: AuthState }) => state.auth.isHydrated;
export const selectCurrentRole = (state: { auth: AuthState }) => state.auth.user?.role || null;
