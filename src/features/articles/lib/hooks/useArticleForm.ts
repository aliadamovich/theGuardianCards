import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { addUserArticle, selectUserCreated, updateUserArticle } from '@/features/articles/model/ArticlesSlice'
import { GuardianArticle } from '@/features/articles/api/guardianApi.types'
import { ArticleFormValues, articleSchema } from '@/features/articles/lib/articleSchema'
import { PATH } from '@/routes/Paths'

export const useArticleForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: string }>()
	const isEditing = !!id
	const userCreatedArticles = useAppSelector(selectUserCreated)
	const articleToEdit = isEditing ? userCreatedArticles.find((article) => article.id === id) : undefined

	const form = useForm<ArticleFormValues>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: '',
			section: '',
			imageUrl: '',
			trailText: '',
			body: '',
		},
	})

	const { reset } = form

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
			alert('Failed to save article. Please try again.')
		}
	}

	return {
		form,
		onSubmit,
		isEditing,
	}
}
