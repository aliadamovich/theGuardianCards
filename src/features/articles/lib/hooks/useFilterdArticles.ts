import { useEffect, useState } from 'react'
import {
	selectFilter,
	selectDeleted,
	selectUserCreated,
	selectSearchTerm,
	selectFavoriteArticles,
} from '../../model/ArticlesSlice'
import { useAppSelector } from '@/app/hooks/hooks'
import { useDebounceValue } from '@/features/articles/lib/hooks/useDebounceValue'
import { useGetArticlesQuery } from '@/features/articles/api/guardianApi'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { useSearchParams } from 'react-router-dom'

export const useFilteredArticles = () => {
	const activeFilter = useAppSelector(selectFilter)
	const favoriteArticles = useSelector(selectFavoriteArticles)
	const deletedArticles = useAppSelector(selectDeleted)
	const userCreatedArticles = useAppSelector(selectUserCreated)
	const searchTerm = useAppSelector(selectSearchTerm)
	const debouncedSearchTerm = useDebounceValue(searchTerm)

	const pageSize = 9
	const [searchParams, setSearchParams] = useSearchParams()
	const urlPage = Number(searchParams.get('page')) || 1
	const [currentPage, setCurrentPage] = useState(urlPage)

	useEffect(() => {
		if (activeFilter !== 'favorites') {
			setSearchParams({ page: currentPage.toString() }, { replace: true })
		} else {
			setSearchParams({}, { replace: true }) // очищаем всё
		}
	}, [currentPage, activeFilter, setSearchParams])

	const adjustedPageSize =
		activeFilter === 'favorites'
			? pageSize
			: currentPage === 1
				? Math.max(1, pageSize - userCreatedArticles.length)
				: pageSize

	const { data, error, isLoading, isFetching } = useGetArticlesQuery(
		activeFilter !== 'favorites'
			? { q: debouncedSearchTerm || undefined, page: currentPage, pageSize: adjustedPageSize }
			: skipToken,
	)

	const apiArticles = data?.response.results || []
	const filteredApiArticles = apiArticles.filter((article) => !deletedArticles.includes(article.id))

	const filteredUserArticles = userCreatedArticles.filter((article) => !deletedArticles.includes(article.id))

	const searchFilteredFavorites = debouncedSearchTerm
		? favoriteArticles.filter(
				(article) =>
					article.webTitle?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
					article.sectionName?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
			)
		: favoriteArticles

	const combinedArticles = currentPage === 1 ? [...filteredUserArticles, ...filteredApiArticles] : filteredApiArticles

	const articlesToShow = activeFilter === 'favorites' ? searchFilteredFavorites || [] : combinedArticles

	const totalItems =
		activeFilter === 'favorites'
			? favoriteArticles.length
			: (data?.response.total || 0) + (currentPage === 1 ? filteredUserArticles.length : 0)

	return {
		currentPage,
		setCurrentPage,
		pageSize: adjustedPageSize,
		totalItems,
		articlesToShow,
		isLoading,
		isFetching,
		error,
	}
}
