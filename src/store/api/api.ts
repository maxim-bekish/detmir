import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICard } from "./../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

interface www {
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
  tagTypes: ["Basket"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getCards: builder.query<www, null>({
      query: () => "products?limit=15&page=1",
    }),
  }),
});

export const { useGetCardsQuery } = api;
