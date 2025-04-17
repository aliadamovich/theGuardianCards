import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks/hooks'
import { useGetArticlesQuery } from '@/features/products/api/articlesApi'
import Article from '@/features/products/ui/article/Article'
import s from './Articles.module.scss'

export const ArticlesList = () => {
	const { data, isLoading, isError } = useGetArticlesQuery()
	// const favorites = useAppSelector((state) => state.favorites.ids)
	const dispatch = useAppDispatch()
	// const navigate = useNavigate()

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error loading articles.</p>

	return (
		<div className={s.container}>
			{data?.response.results.map(article => <Article article={article} />)}
		</div>
	)
}
