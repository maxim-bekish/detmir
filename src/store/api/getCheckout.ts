import { ICard } from "../../types/card.types";
import { getCards } from "./getCardsStart";
export const getCheckout = getCards.injectEndpoints({
  endpoints: (builder) => ({
    getCheckout: builder.query<{ data: ICard[][] }, number>({
      query: (id) => `orders?limit=10&page=${id}`,
      providesTags: () => [{ type: "UpdateOrders" }],
    }),
  }),
});
export const { useGetCheckoutQuery } = getCheckout;
