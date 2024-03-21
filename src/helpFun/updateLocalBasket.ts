import { ICard, ProductInBasket } from "../types/card.types";
// Функция для обновления локальной корзины

export const updateLocalBasket = (
  basket: ICard[], // текущая корзина
  updates: ProductInBasket[], // массив обновлений
  replace: boolean // флаг полной замены корзины
): ProductInBasket[] | [] => {
  let updatedBasket = basket.map((item) => ({
    id: item.product.id,
    quantity: item.quantity,
  }));

  // Если установлен флаг полной замены, присваиваем обновленную корзину
  if (replace) {
    updatedBasket = updates;
  } else {
    // Иначе обновляем количество товаров
    updates.forEach((update) => {
      // Ищем индекс товара в корзине
      const index = updatedBasket.findIndex((item) => item.id === update.id);
      // Если товар найден, обновляем количество
      if (index !== -1) {
        updatedBasket[index].quantity = update.quantity;
      } else {
        // Иначе добавляем новый товар
        updatedBasket.push(update);
      }
    });
  }

  return updatedBasket.filter((item) => item.quantity > 0);
};
