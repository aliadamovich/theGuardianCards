import { useState, useEffect } from 'react';
import { useGetArticlesQuery } from '../api/guardianApi';
import {
	selectFavorites,
	selectDeleted,
	selectFilter,
	selectSearchTerm,
	selectUserCreated,
	setFilter,
	setSearchTerm
} from '../model/ArticlesSlice';
import Article from './article/Article';
import { Link } from 'react-router-dom';
import s from './ArticlesPage.module.scss';
import { GuardianArticle } from '../api/guardianApi.types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { PATH } from '@/routes/Paths';
import { Button } from '@/app/components/button/Button';
import { TextField } from '@/app/components/textField/TextField';
import { Pagination } from '@/app/components/button/pagination/Pagination';
import { FilterButtons } from '@/features/products/ui/filterButtons/FilterButtons';

export const ArticlesPage = () => {
	const dispatch = useAppDispatch();
	const activeFilter = useAppSelector(selectFilter);
	const favorites = useAppSelector(selectFavorites);
	const deletedArticles = useAppSelector(selectDeleted);
	const userCreatedArticles = useAppSelector(selectUserCreated);
	const searchTerm = useAppSelector(selectSearchTerm);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 12;

	// Debounced search term
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

	// Update debounced search term
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	// Fetch articles from Guardian API
	const { data, error, isLoading } = useGetArticlesQuery({
		q: debouncedSearchTerm || undefined,
		page: currentPage,
		pageSize: pageSize,
	});

	// Reset to page 1 when search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearchTerm]);

	// Combine API articles and user-created articles
	const allArticles = [
		...(data?.response.results || []),
		...userCreatedArticles
	];

	// Filter out deleted articles
	const articlesToShow = allArticles.filter(article => !deletedArticles.includes(article.id));

	// Apply filter (all vs favorites)
	const filteredArticles = activeFilter === 'favorites'
		? articlesToShow.filter(article => favorites.includes(article.id))
		: articlesToShow;

	// Search function
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value));
	};


	return (
		<div className={s.articlesPageContainer}>

			<div className={s.searchBar}>
				<TextField
					search
					placeholder="Search articles..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>

			<div className={s.controls}>
				<FilterButtons />
				<Button as={Link} to={PATH.CREATE_PRODUCT} variant='link'>Create New Article + </Button>
			</div>


			{isLoading && <div className={s.loading}>Loading articles...</div>}

			{error && <div className={s.error}>Error loading articles. Please try again later.</div>}

			{!isLoading && !error && filteredArticles.length === 0 && (
				<div className={s.noResults}>
					{activeFilter === 'favorites'
						? 'No favorite articles yet. Click the heart icon to add articles to your favorites.'
						: 'No articles found. Try adjusting your search.'}
				</div>
			)}

			<div className={s.articleGrid}>
				{filteredArticles.map(article => (
					<Article key={article.id} article={article} />
				))}
			</div>

			{data && data.response.total > pageSize && (
				<div className={s.paginationContainer}>
					<Pagination
						currentPage={currentPage}
						onPageChange={(page: number) => { setCurrentPage(page) }}
						totalPages={data?.response.total}
					/>
				</div>
			)}
			
		</div>
	);
};


