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
import { ActionButtons } from '@/features/articles/ui/actionButtons/ActionButtons';
import noImage from '@/assets/no-photo.jpg'

export const Article = ({ article }: { article: GuardianArticle }) => {
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
						<img src={noImage} alt="image not found" className={s.image} />
					)}
			</div>
			<ActionButtons articleId={article.id} isHovering={isHovering}/>
		</div>
	)
}
