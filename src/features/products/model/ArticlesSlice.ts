import { GuardianArticle } from '@/features/products/api/guardianApi.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ArticlesState = {
  favorites: string[];
  userCreated: GuardianArticle[];
  deleted: string[];
  filter: 'all' | 'favorites';
  searchTerm: string;
}


export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
		favorites: [],
		userCreated: [],
		deleted: [],
		filter: 'all',
		searchTerm: '',
	} as ArticlesState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      const favoriteIndex = state.favorites.indexOf(articleId);
      
      if (favoriteIndex === -1) {
        state.favorites.push(articleId);
      } else {
        state.favorites.splice(favoriteIndex, 1);
      }
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      state.deleted.push(articleId);
      
      const favoriteIndex = state.favorites.indexOf(articleId);
      if (favoriteIndex !== -1) {
        state.favorites.splice(favoriteIndex, 1);
      }
    },
    addUserArticle: (state, action: PayloadAction<GuardianArticle>) => {
      state.userCreated.push(action.payload);
    },
    updateUserArticle: (state, action: PayloadAction<GuardianArticle>) => {
      const index = state.userCreated.findIndex(article => article.id === action.payload.id);
      if (index !== -1) {
        state.userCreated[index] = action.payload;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
	selectors: {
		selectFavorites: (state) => state.favorites,
		selectUserCreated: (state) => state.userCreated,
		selectDeleted: (state) => state.deleted,
		selectFilter: (state) => state.filter,
		selectSearchTerm: (state) => state.searchTerm,

	}
});

export const { 
  toggleFavorite, 
  deleteArticle, 
  addUserArticle, 
  updateUserArticle,
  setFilter,
  setSearchTerm
} = articlesSlice.actions;

export const { selectDeleted, selectFavorites, selectFilter, selectSearchTerm, selectUserCreated } = articlesSlice.selectors

export const articlesReducer = articlesSlice.reducer;