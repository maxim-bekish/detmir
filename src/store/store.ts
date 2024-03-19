import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as BasketReducer } from "./basket/basket.slice";

import { getCards } from "./api/getCardsStart";

const reducers = combineReducers({
  basket: BasketReducer,
  [getCards.reducerPath]: getCards.reducer,
}); //all reducers

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getCards.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
