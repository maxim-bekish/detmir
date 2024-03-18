import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICards, ICard } from "./../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getCards: builder.query<{ data: ICards[] }, number>({
      query: (id) => `products?limit=15&page=${id}`,
    }),
    getCard: builder.query<ICards, number>({
      query: (id) => `products/${id}`,
    }),
    getBasket: builder.query<ICard[], null>({
      query: () => `cart`,
    }),
    getCheckout: builder.query<{ data: ICard[][] }, number>({
      query: (id) => `orders?limit=15&page=${id}`,
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardQuery,
  useGetBasketQuery,
  useGetCheckoutQuery,
} = api;
