import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    handleOpenModal: () => {
      return true;
    },
    handleCloseModal: () => {
      return false;
    },
  },
});

export const { handleOpenModal, handleCloseModal } = modalSlice.actions;

export default modalSlice;
