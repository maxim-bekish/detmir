import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as BasketReducer } from "./slices/basket.slice";
import { reducer as OrdersReducer } from "./slices/orders.slice";

import { getCards } from "./api/getCardsStart";

const reducers = combineReducers({
  basket: BasketReducer,
  orders: OrdersReducer,
  [getCards.reducerPath]: getCards.reducer,
}); //all reducers

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getCards.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
