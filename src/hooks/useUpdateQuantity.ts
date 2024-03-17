import { useState } from "react";
import { useAddBasket } from "./useAddBasket";
import { usePostCardBasketMutation } from "../store/api/basket.api";
import { updateLocalBasket } from "../helpFun/updateLocalBasket";
import { useActions } from "./useActions";

// Создаем хук useUpdateQuantity
export const useUpdateQuantity = () => {
  const { basket } = useAddBasket();
  const { toggleBasket } = useActions();
  const [updateBasketMutation] = usePostCardBasketMutation();
  const [error, setError] = useState<string | null>(null);

  // Функция для обновления количества товаров в корзине
  const updateQuantity = async (productId: string | null, quantity: number) => {
    try {
      if (productId === null) {
        // Если productId равен null, просто очищаем состояние корзины
        toggleBasket([]);
        return; // Завершаем выполнение функции
      }
      // Обновляем локальное состояние корзины
      const updatedBasket = updateLocalBasket(basket, quantity, productId);

      // Отправляем запрос на сервер с обновленной корзиной
      const response = await updateBasketMutation({
        data: updatedBasket,
      });

      if ("data" in response) {
        // Возвращаем обновленную корзину
        toggleBasket(response.data);
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
