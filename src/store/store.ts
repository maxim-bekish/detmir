import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as inBasketReducer } from "./inBasket/inBasket.slice";

const reducers = combineReducers({ reducers: inBasketReducer }); // хз нужно ли

export const store = configureStore({
  reducer: reducers,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
