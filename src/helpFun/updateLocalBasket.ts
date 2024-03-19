import { ICard, ProductInBasket } from "../types/card.types";

export const updateLocalBasket = (
  basket: ICard[],
  count: number,
  id: string
): ProductInBasket[] | [] => {
  let updatedBasket: ProductInBasket[] = [];
  if (basket.length === 0) {
    if (count <= 0) return [];

    updatedBasket = [{ quantity: count, id: id }];
  } else {
    updatedBasket = basket
      .map((item: ICard) => {
        if (Number(item.product.id) === Number(id)) {
          if (count <= 0) return null;
          // в этом случае нужно
          return { quantity: count, id: item.product.id };
        }
        return { quantity: item.quantity, id: item.product.id };
      })
      .filter((item): item is ProductInBasket => !!item);
    // Добавляем новый объект, если такого ID не было в basket
    const isNewItemExist = basket.some(
      (item) => Number(item.product.id) === Number(id)
    );
    if (!isNewItemExist && count > 0) {
      updatedBasket.push({ quantity: count, id: id });
    }
  }
  return updatedBasket;
};
