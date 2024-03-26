import { OrdersData } from "../../types/card.types";
import { getProducts } from "./getCardsStart";

export const getOrders = getProducts.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersData, number>({
      query: (id) => `orders?limit=10&page=${id}`,
      providesTags: () => [{ type: "UpdateOrders" }],
    }),
  }),
});
export const { useGetOrdersQuery } = getOrders;
