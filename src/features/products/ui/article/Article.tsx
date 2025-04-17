import { useState } from 'react';
import s from './Article.module.scss'
import { GuardianArticle } from '@/features/products/api/guardianApi.types'
import { MdStarBorder } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Article = ({ article }: { article: GuardianArticle }) => {
	// const navigate = useNavigate();
	const [isHovering, setIsHovering] = useState(false);
	const truncateText = (text: string, maxLength: number) => {
		if (!text) return '';
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};
	const trailText = article.fields?.trailText || '';

	const isFavorite = true
	return (
		<div
			key={article.id}
			className={s.card}
			// onClick={() => navigate(`/articles/${encodeURIComponent(article.id)}`)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<p className={s.section}>{new Date(article.webPublicationDate).toLocaleDateString()}</p>
			{/* <h3 className={s.title}>{truncateText(article.webTitle, 68)}</h3> */}
			<h3 className={s.title}>{article.webTitle}</h3>
			<p className={s.section}>{article.sectionName}</p>
				
			<p className={s.trailText}>{truncateText(trailText, 70)}</p>
			<div className={s.imageContainer}>
				{article.fields?.thumbnail ? (
					<img src={article.fields.thumbnail} alt={article.webTitle} className={s.image} />
				) : (
					<div className={s.placeholderImage}>No Image</div>
				)}
			</div>
			<div className={s.actions}>
				<button
					className={`${s.likeButton} ${isFavorite ? s.liked : ''}`}
					// onClick={handleFavoriteClick}
					aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
					title={isFavorite ? "Remove from favorites" : "Add to favorites"}
				>
					{<MdStarBorder color={isFavorite ? 'yellow': 'white'}/>}
				</button>

				<button
					className={s.deleteButton}
					// onClick={handleDeleteClick}
					aria-label="Delete article"
					title="Delete article"
				>
					<MdDeleteOutline />
				</button>
			</div>
		</div>
	)
}

export default Article
