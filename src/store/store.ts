import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as BasketReducer } from "./basket/basket.slice";
import {api} from './api/api'

const reducers = combineReducers({ basket: BasketReducer,
[api.reducerPath]: api.reducer }); //all reducers

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
