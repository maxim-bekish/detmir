import { getProducts } from "./getCardsStart";
export const postBasketUpdate = getProducts.injectEndpoints({
  endpoints: (builder) => ({
    postBasketUpdate: builder.mutation({
      query: (card) => ({
        body: card,
        url: "cart/update",
        method: "POST",
      }),
    }),
  }),
});
export const { usePostBasketUpdateMutation } = postBasketUpdate;
