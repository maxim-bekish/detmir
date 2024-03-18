import { ICard } from "../types/card.types";

export function totalPrice(cards: ICard[]): number {
  return cards.reduce(
    (total, card) => total + card.quantity * card.product.price,
    0
  );
}
