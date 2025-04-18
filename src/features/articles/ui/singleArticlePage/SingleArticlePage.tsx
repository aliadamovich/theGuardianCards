// src/features/articles/pages/ArticleDetailPage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	selectUserCreated,
	selectFavorites,
	toggleFavorite,
	deleteArticle
} from '../../model/ArticlesSlice';
import s from './SingleArticlePage.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { useGetArticleByIdQuery } from '@/features/articles/api/guardianApi';

export const SingleArticlePage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	if (!id) {
		return <div>Invalid article ID</div>;
	}

	// Check if this is a user-created article first
	const userCreatedArticles = useAppSelector(selectUserCreated);
	const userArticle = userCreatedArticles.find(article => article.id === id);

	// If not user-created, fetch from API
	const { data, error, isLoading } = useGetArticleByIdQuery(id, {
		skip: !!userArticle
	});

	const apiArticle = data?.response?.content;
	const article = userArticle || apiArticle;

	const favorites = useAppSelector(selectFavorites);
	const isFavorite = article && favorites.includes(article.id);

	const handleToggleFavorite = () => {
		if (article) {
			dispatch(toggleFavorite(article.id));
		}
	};

	const handleDelete = () => {
		if (article) {
			dispatch(deleteArticle(article.id));
			navigate('/articles');
		}
	};

	if (isLoading) {
		return <div className={s.loading}>Loading article...</div>;
	}

	if (error || !article) {
		return (
			<div className={s.error}>
				<h2>Article not found</h2>
				<p>The article you're looking for doesn't exist or has been deleted.</p>
				<Link to="/articles" className={s.backButton}>Back to Articles</Link>
			</div>
		);
	}

	return (
		<div className={s.container}>
			<div className={s.header}>
				<Link to="/articles" className={s.backButton}>← Back to Articles</Link>

				<div className={s.actions}>
					{userArticle && (
						<Link to={`/edit-article/${id}`} className={s.editButton}>
							Edit Article
						</Link>
					)}

					<button
						className={`${s.favoriteButton} ${isFavorite ? s.favorited : ''}`}
						onClick={handleToggleFavorite}
					>
						{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
					</button>

					<button
						className={s.deleteButton}
						onClick={handleDelete}
					>
						Delete Article
					</button>
				</div>
			</div>

			<article className={s.article}>
				<h1 className={s.title}>{article.webTitle}</h1>

				<div className={s.meta}>
					<span className={s.section}>{article.sectionName}</span>
					<span className={s.date}>
						{new Date(article.webPublicationDate).toLocaleDateString()}
					</span>
				</div>

				{article.fields?.thumbnail && (
					<div className={s.featuredImage}>
						<img
							src={article.fields.thumbnail}
							alt={article.webTitle}
							className={s.image}
						/>
					</div>
				)}

				<div className={s.content}>
					{article.fields?.headline && (
						<h2 className={s.headline}>{article.fields.headline}</h2>
					)}

					{article.fields?.trailText && (
						<p className={s.trailText}>{article.fields.trailText}</p>
					)}

					{article.fields?.body ? (
						<div
							className={s.body}
							dangerouslySetInnerHTML={{ __html: article.fields.body }}
						/>
					) : (
						<p className={s.excerpt}>
							{article.fields?.trailText || 'No content available'}
						</p>
					)}
				</div>

				<div className={s.footer}>
					<a
						href={article.webUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={s.sourceLink}
					>
						Read original article
					</a>
				</div>
			</article>
		</div>
	);
};
