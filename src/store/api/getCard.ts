import { ICards } from "../../types/card.types";
import { getCards } from "./getCardsStart";
export const getCard = getCards.injectEndpoints({
  endpoints: (builder) => ({
    getCard: builder.query<ICards, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});
export const { useGetCardQuery } = getCard;
