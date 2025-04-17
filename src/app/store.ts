import { configureStore } from '@reduxjs/toolkit'
import { articlesReducer } from '@/features/products/model/ArticlesSlice'
import { guardianApi } from '@/features/products/api/guardianApi'

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