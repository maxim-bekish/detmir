import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as BasketReducer } from "./slices/basket.slice";
import { reducer as OrdersReducer } from "./slices/orders.slice";
import { reducer as ProductsReducer } from "./slices/products.slice";

import { getProducts } from "./api/getCardsStart";

const reducers = combineReducers({
  basket: BasketReducer,
  orders: OrdersReducer,
  products: ProductsReducer,
  [getProducts.reducerPath]: getProducts.reducer,
}); //all reducers

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getProducts.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
