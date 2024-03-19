import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICards } from "../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

export const getCards = createApi({
  reducerPath: "api",
  tagTypes: ["UpdateOrders", "UpdateCard"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getCards: builder.query<{ data: ICards[] }, number>({
      query: (id) => `products?limit=15&page=${id}`,
    }),
  }),
});

export const { useGetCardsQuery } = getCards;
