import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { modal: boolean; error: string } = {
  modal: false,
  error: "",
};

export const openModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalInRedux: (
      state,
      { payload: data }: PayloadAction<{ modal: boolean; error: string }>
    ) => {
      return data; // Возвращаем новое состояние на основе payload
    },
  },
});

export const { actions, reducer } = openModal;
