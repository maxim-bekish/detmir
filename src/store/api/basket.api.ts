import { api } from "./api";
export const basketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postCardBasket: builder.mutation({
      query: (card) => ({
        body: card,
        url: "cart/update",
        method: "POST",
      }),
    }),
    postCheckoutBasket: builder.mutation({
      query: (card) => ({
        body: card,
        url: "cart/submit",
        method: "POST",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
export const { usePostCardBasketMutation, usePostCheckoutBasketMutation } =
  basketApi;
