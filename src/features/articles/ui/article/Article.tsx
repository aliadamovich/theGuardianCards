import { useState } from 'react';
import s from './Article.module.scss'
import { MdStarBorder, MdStar } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GuardianArticle } from '@/features/articles/api/guardianApi.types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { deleteArticle, selectFavorites, toggleFavorite } from '@/features/articles/model/ArticlesSlice';
import clsx from 'clsx';
import { PATH } from '@/routes/Paths';

const Article = ({ article }: { article: GuardianArticle }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isHovering, setIsHovering] = useState(false);
	const favorites = useAppSelector(selectFavorites);
	const isFavorite = favorites.includes(article.id);

	// const truncateText = (text: string, maxLength: number) => {
	// 	if (!text) return '';
	// 	return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	// };
	// const trailText = article.fields?.trailText || '';


	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(toggleFavorite(article.id));
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(deleteArticle(article.id));
	};
	return (
		<div
			key={article.id}
			className={s.card}
			onClick={() => navigate(`${PATH.PRODUCTS}/${encodeURIComponent(article.id)}`)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className={s.cardContent}>
				<span className={clsx(s.section, s.date)}>{new Date(article.webPublicationDate).toLocaleDateString()}</span>
				<h3 className={s.title}>{article.webTitle}</h3>
				<p className={s.section}>{article.sectionName}</p>
				<p className={s.trailText}>{article.fields.trailText}</p>
			</div>

			<div className={s.imageContainer}>
					{article.fields?.thumbnail ? (
						<img src={article.fields.thumbnail} alt={article.webTitle} className={s.image} />
					) : (
						<div className={s.placeholderImage}>No Image</div>
					)}
			</div>

			<div className={s.iconButtons}>

				<button
					className={clsx(s.deleteButton, isHovering && s.hoveredButton)}
					onClick={handleDeleteClick}
					aria-label="Delete article"
					title="Delete article"
				>
					<MdDeleteOutline />
				</button>

				<button
					className={`${s.likeButton} ${isFavorite ? s.liked : ''}`}
					onClick={handleFavoriteClick}
					aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
					title={isFavorite ? "Remove from favorites" : "Add to favorites"}
				>
					{isFavorite ? <MdStar /> : <MdStarBorder />}
				</button>
			</div>
		</div>
	)
}

export default Article
