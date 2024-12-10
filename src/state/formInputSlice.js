import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistration: false,
  isAuthenticating: false,
};

const formInputSlice = createSlice({
  name: "formInputSlice",
  initialState,
  reducers: {
    setIsRegistration: (state, action) => {
      state.isRegistration = action.payload;
    },

    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const { setIsRegistration, setIsAuthenticating } =
  formInputSlice.actions;

export default formInputSlice;
