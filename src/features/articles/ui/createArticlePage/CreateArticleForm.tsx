import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './CreateArticlePage.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { addUserArticle, selectUserCreated, updateUserArticle } from '@/features/articles/model/ArticlesSlice'
import { GuardianArticle } from '@/features/articles/api/guardianApi.types'
import { Button } from '@/app/components/button/Button'
import { TextField } from '@/app/components/textField/TextField'
import { ArticleFormValues, articleSchema } from '@/features/articles/lib/articleSchema'
import { PATH } from '@/routes/Paths'

export const CreateArticleForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: string }>()
	const isEditing = !!id
	const userCreatedArticles = useAppSelector(selectUserCreated)
	const articleToEdit = isEditing ? userCreatedArticles.find((article) => article.id === id) : undefined

	// Настраиваем react-hook-form с zod resolver
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ArticleFormValues>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: '',
			section: '',
			imageUrl: '',
			trailText: '',
			body: '',
		},
	})

	// Загружаем данные статьи если редактируем
	useEffect(() => {
		if (articleToEdit) {
			reset({
				title: articleToEdit.webTitle,
				section: articleToEdit.sectionName,
				imageUrl: articleToEdit.fields?.thumbnail || '',
				trailText: articleToEdit.fields?.trailText || '',
				body: articleToEdit.fields?.body || '',
			})
		}
	}, [articleToEdit, reset])

	// Обработчик отправки формы
	const onSubmit = async (data: ArticleFormValues) => {
		try {
			const currentDate = new Date().toISOString()

			const articleData: GuardianArticle = {
				id: isEditing ? id! : `user-${Date.now()}`,
				type: 'article',
				sectionId: data.section.toLowerCase().replace(/\s+/g, '-'),
				sectionName: data.section,
				webPublicationDate: articleToEdit?.webPublicationDate || currentDate,
				webTitle: data.title,
				webUrl: '#',
				apiUrl: '#',
				isHosted: false,
				fields: {
					thumbnail: data.imageUrl || undefined,
					trailText: data.trailText,
					headline: data.title,
					body: data.body,
				},
			}

			if (isEditing) {
				dispatch(updateUserArticle(articleData))
			} else {
				dispatch(addUserArticle(articleData))
			}

			navigate(`${PATH.PRODUCTS}/${articleData.id}`)
		} catch (error) {
			console.error('Error saving article:', error)
			alert('Failed to save article. Please try again.')
		}
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.formGroup}>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<TextField
							label="Title*"
							placeholder="Enter article title"
							{...field}
							id="title"
							errorMessage={errors.title && errors.title.message}
						/>
					)}
				/>
			</div>

			<div className={s.formGroup}>
				<Controller
					name="section"
					control={control}
					render={({ field }) => (
						<TextField
							label="Section*"
							placeholder="E.g., Technology, Sports, Health..."
							id="section"
							{...field}
							errorMessage={errors.section && errors.section.message}
						/>
					)}
				/>
			</div>

			<div className={s.formGroup}>
				<Controller
					name="imageUrl"
					control={control}
					render={({ field }) => (
						<TextField
							label="imageUrl"
							placeholder="https://example.com/image.jpg"
							id="section"
							{...field}
							errorMessage={errors.imageUrl && errors.imageUrl.message}
						/>
					)}
				/>
			</div>

			<div className={s.formGroup}>
				<label htmlFor="trailText" className={s.label}>
					Summary *
				</label>
				<Controller
					name="trailText"
					control={control}
					render={({ field }) => (
						<textarea
							{...field}
							id="trailText"
							className={`${s.textarea} ${errors.trailText ? s.error : ''}`}
							placeholder="A brief summary of the article"
							rows={3}
						/>
					)}
				/>
				{errors.trailText && <p className={s.errorText}>{errors.trailText.message}</p>}
			</div>

			<div className={s.formGroup}>
				<label htmlFor="body" className={s.label}>
					Content *
				</label>
				<Controller
					name="body"
					control={control}
					render={({ field }) => (
						<textarea
							{...field}
							id="body"
							className={`${s.textarea} ${errors.body ? s.error : ''}`}
							placeholder="Full article content..."
							rows={10}
						/>
					)}
				/>
				{errors.body && <p className={s.errorText}>{errors.body.message}</p>}
			</div>

			<div className={s.formActions}>
				<Button type="submit" variant="active" disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
				</Button>
			</div>
		</form>
	)
}
