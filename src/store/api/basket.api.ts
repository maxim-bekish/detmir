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
  }),
});
export const { usePostCardBasketMutation } = basketApi;