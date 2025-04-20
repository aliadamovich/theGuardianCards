import { CreateArticleForm } from '@/features/articles/ui/createArticlePage/CreateArticleForm'
import s from './CreateArticlePage.module.scss'
import { Button } from '@/app/components/button/Button'
import { useNavigate, useParams } from 'react-router-dom'

export const CreateArticlePage = () => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const isEditing = !!id

	return (
		<div className={s.container}>
			<div className={s.header}>
				<h1>{isEditing ? 'Edit Article' : 'Create New Article'}</h1>
				<Button onClick={() => navigate(-1)}>Cancel</Button>
			</div>
			<CreateArticleForm />
		</div>
	)
}
