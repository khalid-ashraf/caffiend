import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistration: false,
  email: "",
  password: "",
  isAuthenticating: false,
};

const formInputSlice = createSlice({
  name: "formInputSlice",
  initialState,
  reducers: {
    setIsRegistration: (state, action) => {
      state.isRegistration = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
    handleSubmit: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const {
  setIsRegistration,
  setEmail,
  setPassword,
  setIsAuthenticating,
  handleSubmit,
} = formInputSlice.actions;

export default formInputSlice;
