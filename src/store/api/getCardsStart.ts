import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProductsData } from "../../types/card.types";
const API_URL = "https://skillfactory-task.detmir.team/";

export const getProducts = createApi({
  reducerPath: "api",
  tagTypes: ["UpdateOrders", "UpdateCard"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<ProductsData, number>({
      query: (id) => `products?limit=15&page=${id}`,
    }),
  }),
});

export const { useGetProductsQuery } = getProducts;
// useGetProductsQuery