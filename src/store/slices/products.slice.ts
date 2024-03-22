import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsData } from "../../types/card.types";

const initialState: ProductsData = {
  data: [],
  meta: { total: 0, count: 0 },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsInRedux: (
      state,
      { payload: { data, meta } }: PayloadAction<ProductsData>
    ) => {
      if (state.data.length !== 0) {
        let x = state.data.some((el) => data.some((el2) => el2.id === el.id));
        if (!x) {
          state.data.push(...data);
          state.meta.total += meta.count;
        }
      } else {
        state.data.push(...data);
        state.meta.total = meta.count;
      }

      // Добавляем только уникальные подмассивы в основной массив
    },
  },
});

export const { actions, reducer } = productsSlice;
