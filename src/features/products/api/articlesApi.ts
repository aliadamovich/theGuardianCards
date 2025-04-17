import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Product } from './types'

import { GuardianResponse } from './articlesApi.types'

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const articlesApi = createApi({
	reducerPath: 'articlesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://content.guardianapis.com/',
	}),
	endpoints: (builder) => ({
		getArticles: builder.query<GuardianResponse, void>({
			query: () => `search?api-key=${API_KEY}&show-fields=thumbnail`,
		}),
		// getArticleById: builder.query<any, string>({
		// 	query: (id) => `${id}?api-key=${API_KEY}`,
		// }),
	}),
})

export const { useGetArticlesQuery } = articlesApi
