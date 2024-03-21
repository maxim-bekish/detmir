import { useState } from "react";
import { useAddBasket } from "./useAddBasket";

import { updateLocalBasket } from "../helpFun/updateLocalBasket";
import { useActions } from "./useActions";
import { usePostBasketUpdateMutation } from "../store/api/postBasketUpdate.api";

interface IUpdateQuantity {
  id: string;
  quantity: number;
}
export const useUpdateBasket = () => {
  const { basket } = useAddBasket();
  const { updateBasketInRedux } = useActions();
  const [updateCartOnServer] = usePostBasketUpdateMutation();
  const [error, setError] = useState<string>("null");

  // Функция для обновления количества товаров в корзине
  const updateBasketItems = async (array: IUpdateQuantity[], bool: boolean) => {
    try {
      let data: { id: string; quantity: number }[] = [];
      if (array[0].id === "null") {
        data = [];
      } else {
        data = updateLocalBasket(basket, array, bool);
      }
      const response = await updateCartOnServer({
        data: data,
      });
      // Отправляем запрос на сервер с обновленной корзиной

      if ("data" in response) {
        // Возвращаем обновленную корзину
        updateBasketInRedux(response.data);
        return response.data;
      }
    } catch (error) {
      // Обрабатываем ошибку при обновлении количества товаров
      setError("Ошибка при обновлении количества товаров.");
      throw error;
    }
  };

  return { updateBasketItems, error };
};
