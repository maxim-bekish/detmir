import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../types/card.types";

const initialState: ICard[] = [];

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    toggleBasket: (state, { payload: dataCard }: PayloadAction<ICard[]>) => {
      // Создаем новый массив, основанный на текущем состоянии
      const newState: ICard[] = [...state];

      // Перебираем полученный массив товаров
      dataCard.forEach((element) => {
        const index = newState.findIndex(
          (e) => e.product.id === element.product.id
        );

        if (index !== -1) {
          // Если товар уже присутствует в корзине, создаем новый объект с обновленным количеством
          newState[index] = { ...newState[index], quantity: element.quantity };
        } else {
          // Иначе добавляем новый товар в корзину
          newState.push(element);
        }
      });

      // Фильтруем newState, оставляя только те элементы, которые есть в dataCard
      const updatedState = newState.filter((item) =>
        dataCard.some((element) => element.product.id === item.product.id)
      );

      return updatedState;
    },
   
  },
});

export const { actions, reducer } = basketSlice;
