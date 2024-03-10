import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useGetBasketQuery } from "../api/api";

// interface typeData {
//   createdAt: string;
//   product: {
//     category: string;
//     description: string;
//     id: string;
//     picture: string;
//     price: number;
//     rating: number;
//     title: string;
//   };
//   quantity: number;
// }
interface typeData {
  id: string;
  quantity: number;
}

const initialState: typeData[] = [];
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    toggleBasket: (state, { payload: dataCard }: PayloadAction<typeData>) => {
      const index = state.findIndex((e) => e.id === dataCard.id);

      if (index !== -1) {
        // Если продукт уже присутствует в корзине, обновляем его количество
        if (dataCard.quantity > 0) {
          state[index].quantity = dataCard.quantity;
        } else if (dataCard.quantity === 0) {
          state.splice(index, 1); // Удаляем продукт из корзины, если его количество равно 0
        }
      } else {
        // Иначе добавляем новый продукт в корзину
        state.push(dataCard);
      }
    },
  },
});

export const { actions, reducer } = basketSlice;
