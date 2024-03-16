import { ICard } from "../types/card.types";

export function totalPrice(basket: ICard[]): number {
  let totalPrice = 0;
  basket.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });
  return totalPrice;
}
