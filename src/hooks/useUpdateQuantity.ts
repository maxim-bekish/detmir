import { useState } from "react";
import { useAddBasket } from "./useAddBasket";

import { updateLocalBasket } from "../helpFun/updateLocalBasket";
import { useActions } from "./useActions";
import { usePostBasketUpdateMutation } from "../store/api/postBasketUpdate.api";

export const useUpdateQuantity = () => {
  const { basket } = useAddBasket();
  const { updateCartInRedux } = useActions();
  const [updateCartOnServer] = usePostBasketUpdateMutation();
  const [error, setError] = useState<string | null>(null);

  // Функция для обновления количества товаров в корзине
  const updateQuantity = async (productId: string | null, quantity: number) => {
    try {
      if (productId === null) {
        // Если productId равен null, просто очищаем состояние корзины
        updateCartInRedux([]);
        return; // Завершаем выполнение функции
      }
      // Обновляем локальное состояние корзины
      const updatedBasket = updateLocalBasket(basket, quantity, productId);

      // Отправляем запрос на сервер с обновленной корзиной
      const response = await updateCartOnServer({
        data: updatedBasket,
      });

      if ("data" in response) {
        // Возвращаем обновленную корзину
        updateCartInRedux(response.data);
        return response.data;
      }
    } catch (error) {
      // Обрабатываем ошибку при обновлении количества товаров
      setError("Ошибка при обновлении количества товаров.");
      throw error;
    }
  };

  return { updateQuantity, error };
};
