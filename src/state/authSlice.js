import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegisteration: false,
  email: "",
  password: "",
  isAuthenticating: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsRegisteration: (state, action) => {
      return { ...state, isRegisteration: action.payload };
    },
    setEmail: (state, action) => {
      return { ...state, email: action.payload };
    },
    setPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    setIsAuthenticating: (state, action) => {
      return { ...state, authenticating: action.payload };
    },
    handleSubmit: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
});

export const {
  setIsRegisteration,
  setEmail,
  setPassword,
  setIsAuthenticating,
  handleSubmit,
} = authSlice.actions;

export default authSlice;
