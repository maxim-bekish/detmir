import { getProducts } from "./getCardsStart";
export const postPlaceOrders = getProducts.injectEndpoints({
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
