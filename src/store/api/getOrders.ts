import { OrdersData } from "../../types/card.types";
import { getCards } from "./getCardsStart";

export const getOrders = getCards.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersData, number>({
      query: (id) => `orders?limit=2&page=${id}`,
      providesTags: () => [{ type: "UpdateOrders" }],

    }),
  }),
});
export const { useGetOrdersQuery } = getOrders;
