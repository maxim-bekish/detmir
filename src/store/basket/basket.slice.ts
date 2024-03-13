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
      // Перебираем полученный массив товаров
      dataCard.forEach((element) => {
        const index = state.findIndex((e) => e.id === element.product.id);

        if (index !== -1) {
          // Если товар уже присутствует в корзине, обновляем его количество
          state[index].quantity = element.quantity;
        } else {
          // Иначе добавляем новый товар в корзину
          state.push({
            id: element.product.id,
            quantity: element.quantity,
          });
        }
      });

      // Проверяем, есть ли в текущем состоянии корзины товары, которых нет в полученном массиве
      state.forEach((item, index) => {
        if (!dataCard.some((element) => element.product.id === item.id)) {
          // Если товара нет в полученном массиве, удаляем его из состояния корзины
          state.splice(index, 1);
        }
      });
    },
  },
});

export const { actions, reducer } = basketSlice;
