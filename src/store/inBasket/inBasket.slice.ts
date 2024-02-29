import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types/card.types";

const initialState: ICard[] = [];
export const cardsSlice = createSlice({
  name: "inBasket",
  initialState,
  reducers: {
    toggleInBasket: (state, { payload: inBasket }: PayloadAction<ICard>) => {
      const isExists = state.some((e) => e.id === inBasket.id);
      if (isExists) {
        const index = state.findIndex((item) => item.id === inBasket.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      } else {
        state.push(inBasket);
      }
    },
  },
});

export const { actions, reducer } = cardsSlice;
