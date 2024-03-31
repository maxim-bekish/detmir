import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICards } from "../../types/card.types";

const initialState: ICards[] = [];

export const cardProductsSlice = createSlice({
  name: "cardProducts",
  initialState,
  reducers: {
    addCardProducts: (
      state,
      { payload: cardProduct }: PayloadAction<ICards>
    ) => {
      if (!state.some((item) => item.id === cardProduct.id)) {
        state.push(cardProduct);
      }
    },
  },
});

export const { actions, reducer } = cardProductsSlice;
