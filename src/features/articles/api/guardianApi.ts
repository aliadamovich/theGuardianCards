import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GuardianResponse, SearchParams } from './guardianApi.types'

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const guardianApi = createApi({
	reducerPath: 'guardianApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://content.guardianapis.com/',
	}),
	endpoints: (builder) => ({
		getArticles: builder.query<GuardianResponse<'list'>, SearchParams>({
			query: (params) => {
				const { pageSize, ...rest } = params
				return {
					url: 'search',
					params: {
						...rest,
						'api-key': API_KEY,
						'page-size': pageSize,
						'show-fields': params['show-fields'] || 'thumbnail,trailText,headline',
					},
				}
			},
		}),
		getArticleById: builder.query<GuardianResponse<'single'>, string>({
			query: (id) => ({
				url: `/${id}`,
				params: {
					'api-key': API_KEY,
					'show-fields': 'thumbnail,trailText,headline,body',
				},
			}),
		}),
	}),
})

export const { useGetArticlesQuery, useGetArticleByIdQuery } = guardianApi
