import { ICards } from "../../types/card.types";
import { getProducts } from "./getCardsStart";
export const getCard = getProducts.injectEndpoints({
  endpoints: (builder) => ({
    getCard: builder.query<ICards, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});
export const { useGetCardQuery } = getCard;
