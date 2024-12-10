import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import formInputSlice from "./formInputSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: {
    userAuth: authSlice.reducer,
    formInput: formInputSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export const useAuth = () => {
  return useSelector((state) => state.userAuth);
};

export const useFormInput = () => {
  return useSelector((state) => state.formInput);
};

export const useModal = () => {
  return useSelector((state) => state.modal);
};
