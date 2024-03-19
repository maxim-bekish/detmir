import { ICard } from "../../types/card.types";
import { getCards } from "./getCardsStart";
export const getBasket = getCards.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<ICard[], null>({
      query: () => `cart`,
    }),
  }),
});
export const { useGetBasketQuery } = getBasket;
