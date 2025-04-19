import { useState, useEffect } from 'react';
import { useGetArticlesQuery } from '../api/guardianApi';
import {
	selectFavorites,
	selectDeleted,
	selectFilter,
	selectSearchTerm,
	selectUserCreated,
	setSearchTerm
} from '../model/ArticlesSlice';
import {Article} from './article/Article';
import { Link } from 'react-router-dom';
import s from './ArticlesPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { PATH } from '@/routes/Paths';
import { Button } from '@/app/components/button/Button';
import { TextField } from '@/app/components/textField/TextField';
import { FilterButtons } from '@/features/articles/ui/filterButtons/FilterButtons';
import { Pagination } from '@/app/components/pagination/Pagination';
import { Loader } from '@/app/components/loader/Loader';
import { ErrorMessage } from '@/app/components/errorMessage/ErrorMessage';

export const ArticlesPage = () => {
	const dispatch = useAppDispatch();
	const activeFilter = useAppSelector(selectFilter);
	const favorites = useAppSelector(selectFavorites);
	const deletedArticles = useAppSelector(selectDeleted);
	const userCreatedArticles = useAppSelector(selectUserCreated);
	const searchTerm = useAppSelector(selectSearchTerm);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 9;
	// Fetch articles from Guardian API
	const { data, error, isLoading } = useGetArticlesQuery({
		q: debouncedSearchTerm || undefined,
		page: currentPage,
		pageSize: pageSize,
	});
	// Pagination
	let totalItems = activeFilter === 'favorites' ? favorites.length : data?.response.total || 0;
	const totalPages = Math.ceil(totalItems / pageSize)
	console.log(totalPages);
	


	// Update debounced search term
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);



	// Reset to page 1 when search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearchTerm]);

	// Combine API articles and user-created articles
	const allArticles = [
		...userCreatedArticles,
		...(data?.response.results || [])
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
				<FilterButtons disabled={isLoading}/>
				<Button as={Link} to={PATH.CREATE_PRODUCT} variant='link'>Create New Article + </Button>
			</div>

			{isLoading && <Loader />}
			{error && <ErrorMessage message='Error loading articles. Please try again later'/>}

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

			{totalItems > pageSize && (
				<div className={s.paginationContainer}>
					<Pagination
						currentPage={currentPage}
						onPageChange={(page: number) => { setCurrentPage(page) }}
						totalPages={Math.ceil(totalItems / pageSize)}
					/>
				</div>
			)}
			
		</div>
	);
};

