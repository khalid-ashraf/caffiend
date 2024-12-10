import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import { useSelector } from "react-redux";
import userAuthSlice from "./userAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    userAuth: userAuthSlice.reducer,
  },
});

export const useAuth = () => {
  return useSelector((state) => state.auth);
};

export const useModal = () => {
  return useSelector((state) => state.modal);
};

export const useUserAuth = () => {
  return useSelector((state) => state.userAuth);
};
