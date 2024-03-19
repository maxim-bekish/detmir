import { getCards } from "./getCardsStart";
export const postPlaceOrders = getCards.injectEndpoints({
  endpoints: (builder) => ({
    postPlaceOrders: builder.mutation({
      query: (card) => ({
        body: card,
        url: "cart/submit",
        method: "POST",
      }),
      invalidatesTags: ["UpdateOrders"],
    }),
  }),
});
export const { usePostPlaceOrdersMutation } = postPlaceOrders;
