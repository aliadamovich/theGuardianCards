import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GuardianResponse, SearchParams } from './guardianApi.types'

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const guardianApi = createApi({
	reducerPath: 'guardianApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://content.guardianapis.com/',
	}),
	endpoints: (builder) => ({
		getArticles: builder.query<GuardianResponse, SearchParams>({
			query: (params) => ({
				url: 'search',
				params: {
					...params, 
					'api-key': API_KEY,
					'show-fields': params['show-fields'] || 'thumbnail,trailText,headline',
				}
			}),
		}),
		// getArticleById: builder.query<any, string>({
		// 	query: (id) => `${id}?api-key=${API_KEY}`,
		// }),
	}),
})

export const { useGetArticlesQuery } = guardianApi
