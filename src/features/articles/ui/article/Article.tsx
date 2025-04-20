import { useState } from 'react'
import s from './Article.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GuardianArticle } from '@/features/articles/api/guardianApi.types'
import clsx from 'clsx'
import { PATH } from '@/routes/Paths'
import { ActionButtons } from '@/features/articles/ui/actionButtons/ActionButtons'
import noImage from '@/assets/no-photo.jpg'

export const Article = ({ article }: { article: GuardianArticle }) => {
	const [isHovering, setIsHovering] = useState(false)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams();
	const currentPage = searchParams.get('page') || '1';

	const handleClick = () => {
		navigate(`${PATH.PRODUCTS}/${encodeURIComponent(article.id)}`, {
			state: { fromPage: currentPage }
		});
	};
	
	return (
		<div
			key={article.id}
			className={s.card}
			onClick={handleClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className={s.cardContent}>
				<span className={clsx(s.section, s.date)}>{new Date(article.webPublicationDate).toLocaleDateString()}</span>
				<h3 className={s.title}>{article.webTitle}</h3>
				<p className={s.section}>{article.sectionName}</p>
				{article.fields.trailText && (<p className={s.trailText} dangerouslySetInnerHTML={{ __html: article.fields.trailText }}></p>)}
			</div>

			<div className={s.imageContainer}>
				{article.fields?.thumbnail ? (
					<img src={article.fields.thumbnail} alt={article.webTitle} className={s.image} />
				) : (
					<img src={noImage} alt="image not found" className={s.image} />
				)}
			</div>
			<ActionButtons article={article} isHovering={isHovering} />
		</div>
	)
}
