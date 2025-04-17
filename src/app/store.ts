import { configureStore } from '@reduxjs/toolkit'
import { articlesApi } from '../features/products/api/articlesApi'
// import productsSlice from 'features/products/productsSlice'

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    // articles: articlesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch