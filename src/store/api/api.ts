import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICard } from "./../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

interface cards {
  data: ICard[];
  meta: IMetaData;
}

interface IMetaData {
  count: number;
  total: number;
  sort: any;
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
    getCard: builder.query<ICard, number>({
      query: (id) => `products/${id}`,
    }),
    getBasket: builder.query<ICard, null>({
      query: () => `cart`,
    }),
  }),
});

export const { useGetCardsQuery, useGetCardQuery, useGetBasketQuery } = api;
