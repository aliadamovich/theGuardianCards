import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductsState = {
  userCreated: Article[]
}

// const initialState: ProductsState = {
//   userCreated: [],
// }

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
		userCreated: []
	},
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      state.userCreated.push(action.payload)
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      state.userCreated = state.userCreated.filter(p => p.id !== action.payload)
    },
    // можно добавить updateProduct и т.д.
  },
})

export const { addArticle, removeArticle } = articlesSlice.actions
export default articlesSlice.reducer
