import { configureStore } from '@reduxjs/toolkit'
import { guardianApi } from '@/features/articles/api/guardianApi'
import { articlesReducer } from '@/features/articles/model/ArticlesSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    [guardianApi.reducerPath]: guardianApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(guardianApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch