import { GuardianArticle } from '@/features/articles/api/guardianApi.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ArticlesState = {
	favoriteIds: string[]
	favoriteArticles: GuardianArticle[]
	userCreated: GuardianArticle[]
	deleted: string[]
	filter: 'all' | 'favorites'
	searchTerm: string
}

export const articlesSlice = createSlice({
	name: 'articles',
	initialState: {
		favoriteIds: [],
		favoriteArticles: [],
		userCreated: [],
		deleted: [],
		filter: 'all',
		searchTerm: '',
	} as ArticlesState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<GuardianArticle>) => {
			if (state.favoriteIds.includes(action.payload.id)) {
				state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload.id)
				state.favoriteArticles = state.favoriteArticles.filter((art) => art.id !== action.payload.id)
			} else {
				state.favoriteIds.push(action.payload.id)
				state.favoriteArticles.unshift(action.payload)
			}
		},
		deleteArticle: (state, action: PayloadAction<string>) => {
			const articleId = action.payload
			state.deleted.push(articleId)

			const favoriteIndex = state.favoriteIds.indexOf(articleId)
			if (favoriteIndex !== -1) {
				state.favoriteIds.splice(favoriteIndex, 1)
			}
			state.favoriteArticles = state.favoriteArticles.filter((article) => article.id !== articleId)
		},
		addUserArticle: (state, action: PayloadAction<GuardianArticle>) => {
			state.userCreated.unshift(action.payload)
		},
		updateUserArticle: (state, action: PayloadAction<GuardianArticle>) => {
			const index = state.userCreated.findIndex((article) => article.id === action.payload.id)
			if (index !== -1) {
				state.userCreated[index] = action.payload
			}
		},
		setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
			state.filter = action.payload
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload
		},
	},
	selectors: {
		selectFavoriteIds: (state) => state.favoriteIds,
		selectFavoriteArticles: (state) => state.favoriteArticles,
		selectUserCreated: (state) => state.userCreated,
		selectDeleted: (state) => state.deleted,
		selectFilter: (state) => state.filter,
		selectSearchTerm: (state) => state.searchTerm,
	},
})

export const { toggleFavorite, deleteArticle, addUserArticle, updateUserArticle, setFilter, setSearchTerm } =
	articlesSlice.actions

export const {
	selectDeleted,
	selectFavoriteIds,
	selectFavoriteArticles,
	selectFilter,
	selectSearchTerm,
	selectUserCreated,
} = articlesSlice.selectors

export const articlesReducer = articlesSlice.reducer
