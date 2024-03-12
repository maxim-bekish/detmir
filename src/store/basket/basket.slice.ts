import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types/card.types";
interface typeData {
  id: string;
  quantity: number;
}

const initialState: typeData[] = [];

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    toggleBasket: (state, { payload: dataCard }: PayloadAction<ICard[]>) => {
      dataCard.forEach((element) => {
        const index = state.findIndex((e) => e.id === element.product.id);
        // console.log(dataCard);
        if (index !== -1) {
          // Если продукт уже присутствует в корзине, обновляем его количество
          if (element.quantity > 0) {
            // console.log("Товар обновлен в корзине:", dataCard);
            state[index].quantity = element.quantity;
          } else if (element.quantity <= 0) {
            state.splice(index, 1); // Удаляем продукт из корзины, если его количество равно 0
            // console.log("Товар удален из корзины:", dataCard);
          }
        } else {
          // Иначе добавляем новый продукт в корзину
          if (element.quantity <= 0) return;
          state.push({
            quantity: element.quantity,
            id: element.product.id,
          });
          // console.log("Товар добавлен в корзину:", dataCard);
        }
      });
    },
  },
});

export const { actions, reducer } = basketSlice;
