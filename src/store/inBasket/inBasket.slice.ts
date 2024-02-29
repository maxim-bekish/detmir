import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types/card.types";

const initialState: ICard[] = [];
export const inBasketSlice = createSlice({
  name: "inBasket",
  initialState,
  reducers: {
    toggleInBasket: (state, { payload: www }: PayloadAction<ICard>) => {
      // const isExists = state.some((e) => e.id === www.id);
      // if (isExists) {
      //   const index = state.findIndex((item) => item.id === www.id);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }
      // } else {
      state.push(www);
      // }
    },
  },
});

export const { actions, reducer } = inBasketSlice;
