import { todosSlice } from "../features/todo/todosSlice";
import { configureStore } from "@reduxjs/toolkit";

import { logger, toast, api } from "./middleware";
// ...

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, api, toast),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
