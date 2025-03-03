import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from '../features/ArticlesList/api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { menuReducer } from '../features/Menu/store/menuSlice';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(articlesApi.middleware);
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
