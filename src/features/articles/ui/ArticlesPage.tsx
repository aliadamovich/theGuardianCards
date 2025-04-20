import { useState, useEffect } from 'react'
import { useGetArticlesQuery } from '../api/guardianApi'
import { selectDeleted, selectFilter, selectSearchTerm, selectUserCreated } from '../model/ArticlesSlice'
import { Article } from './article/Article'
import { Link } from 'react-router-dom'
import s from './ArticlesPage.module.scss'
import { useAppSelector } from '@/app/hooks/hooks'
import { PATH } from '@/routes/Paths'
import { Button } from '@/app/components/button/Button'
import { FilterButtons } from '@/features/articles/ui/filterButtons/FilterButtons'
import { Pagination } from '@/app/components/pagination/Pagination'
import { Loader } from '@/app/components/loader/Loader'
import { ErrorMessage } from '@/app/components/errorMessage/ErrorMessage'
import { MSG } from '@/features/articles/lib/messagesVariables'
import { ArticleSearch } from '@/features/articles/ui/articleSearch/ArticleSearch'
import { useFilteredArticles } from '@/features/articles/lib/hooks/useFilterdArticles'

export const ArticlesPage = () => {
	const activeFilter = useAppSelector(selectFilter)

	const { articlesToShow, currentPage, error, isFetching, isLoading, pageSize, setCurrentPage, totalItems } =
		useFilteredArticles()

	return (
		<div className={s.articlesPageContainer}>
			<div className={s.searchBar}>
				<ArticleSearch />
			</div>

			<div className={s.controls}>
				<FilterButtons disabled={isLoading || isFetching} />
				<Button as={Link} to={PATH.CREATE_PRODUCT} variant="link">
					Create New Article +{' '}
				</Button>
			</div>
			{isLoading && <Loader />}
			{error && <ErrorMessage message={MSG.ERROR_LOADING} />}

			{!isLoading && !error && articlesToShow.length === 0 && (
				<ErrorMessage message={activeFilter === 'favorites' ? MSG.NO_FAVORITES : MSG.NO_ARTICLES} />
			)}

			<div className={s.articleGrid}>
				{articlesToShow.map((article) => (
					<Article key={article.id} article={article} />
				))}
			</div>

			{totalItems > pageSize && activeFilter !== 'favorites' && (
				<div className={s.paginationContainer}>
					<Pagination
						currentPage={currentPage}
						onPageChange={(page: number) => {
							setCurrentPage(page)
						}}
						totalPages={Math.ceil(totalItems / pageSize)}
					/>
				</div>
			)}
		</div>
	)
}
