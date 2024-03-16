import { api } from "./api";
export const basketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postCardBasket: builder.mutation({
      query: (card) => ({
        body: card,
        url: "cart/update",
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "GetProduct" }],
    }),
    postCheckoutBasket: builder.mutation({
      query: () => ({
        url: "cart/submit",
        method: "POST",
      }),
    }),
  }),
});
export const { usePostCardBasketMutation, usePostCheckoutBasketMutation } =
  basketApi;
