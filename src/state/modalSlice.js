import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    handleOpenModal: (state) => {
      state.isModalOpen = true;
    },
    handleCloseModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { handleOpenModal, handleCloseModal } = modalSlice.actions;

export default modalSlice;
