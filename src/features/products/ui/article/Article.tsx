import s from './Article.module.scss'
import { GuardianArticle } from '@/features/products/api/articlesApi.types'


const Article = ({ article }: { article: GuardianArticle }) => {

	const isFavorite = true
	return (
		<div
			key={article.id}
			className={s.card}
		// onClick={() => navigate(`/articles/${encodeURIComponent(article.id)}`)}
		>
			<h2 className={s.title}>{article.webTitle}</h2>
			<p className={s.date}>{new Date(article.webPublicationDate).toLocaleString()}</p>
			<p className={s.section}>{article.sectionName}</p>
			<div className={s.imageContainer}><img src={article.fields?.thumbnail} alt={article.webTitle} className={s.image} /></div>
			<div className={s.actions}>
				<button
					onClick={(e) => {
						e.stopPropagation()
						// dispatch(toggleFavorite(article.id))
					}}
					// className={`${s.like} ${liked[article.id] ? s.liked : ''}`}
				>Add to Favorite
					{isFavorite ? '♥' : '♡'}
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation()
						// dispatch(toggleFavorite(article.id))
					}}
				// className={`${s.like} ${liked[article.id] ? s.liked : ''}`}
				>Delete
					{isFavorite ? '♥' : '♡'}
				</button>
			</div>
		</div>
	)
}

export default Article
