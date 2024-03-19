import { getCards } from "./getCardsStart";
export const postBasketUpdate = getCards.injectEndpoints({
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
