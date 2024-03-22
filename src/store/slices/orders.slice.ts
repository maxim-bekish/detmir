import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersData } from "../../types/card.types";

const initialState: OrdersData = {
  data: [],
  meta: { count: 0, total: 0 },
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrdersInRedux: (
      state,
      { payload: { data, meta } }: PayloadAction<OrdersData>
    ) => {
      // Функция для проверки уникальности подмассивов
      const isUniqueSubarray = (arr1: any[], arr2: any[]): boolean => {
        // Проверяем, равны ли длины массивов
        if (arr1.length !== arr2.length) return false;
        // Проверяем, содержат ли массивы одинаковые createdAt в первом элементе
        return arr1[0]?.createdAt === arr2[0]?.createdAt;
      };

      // Фильтруем подмассивы, оставляя только уникальные
      const uniqueData = data.filter(
        (subarray) =>
          !state.data.some((existingSubarray) =>
            isUniqueSubarray(existingSubarray, subarray)
          )
      );

      // Добавляем только уникальные подмассивы в основной массив
      state.data.push(...uniqueData);

      // Обновляем мета информацию
      state.meta = meta;
    },
  },
});

export const { actions, reducer } = ordersSlice;
