
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICards, ICard } from "./../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

interface cards {
  data: ICards[];
  meta: { count: number; total: number; sort: any };
}
interface checkoutType {
  data: ICards[][];
  meta: { count: number; total: number; };
}

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["GetProduct"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (builder) => ({
    getCards: builder.query<cards, number>({
      query: (id) => `products?limit=15&page=${id}`,
    }),
    getCard: builder.query<ICards, number>({
      query: (id) => `products/${id}`,
    }),
    getBasket: builder.query<ICard[], null>({
      query: () => `cart`,
      providesTags: () => [{ type: "GetProduct" }],
    }),
    getCheckout: builder.query<any, null>({
      query: () => `orders?limit=1&page=1`,
    }),
  }),
});



export const {
  useGetCardsQuery,
  useGetCardQuery,
  useGetBasketQuery,
  useGetCheckoutQuery,
} = api;
