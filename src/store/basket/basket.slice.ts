import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      // console.log(dataCard);
      if (index !== -1) {
        // Если продукт уже присутствует в корзине, обновляем его количество
        if (dataCard.quantity > 0) {
          console.log("Товар обновлен в корзине:", dataCard);
          state[index].quantity = dataCard.quantity;
        } else if (dataCard.quantity <= 0) {
          state.splice(index, 1); // Удаляем продукт из корзины, если его количество равно 0
          console.log("Товар удален из корзины:", dataCard);
        }
      } else {
        // Иначе добавляем новый продукт в корзину
        if (dataCard.quantity <= 0) return
         state.push(dataCard);
        console.log("Товар добавлен в корзину:", dataCard);
      }

      // debugger
       
    },
  },
});

export const { actions, reducer } = basketSlice;
