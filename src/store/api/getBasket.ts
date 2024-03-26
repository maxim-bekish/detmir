import { ICard } from "../../types/card.types";
import { getProducts } from "./getCardsStart";
export const getBasket = getProducts.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<ICard[], null>({
      query: () => `cart`,
    }),
  }),
});
export const { useGetBasketQuery } = getBasket;
