import s from './CreateArticlePage.module.scss'
import { Controller } from 'react-hook-form'
import { Button } from '@/app/components/button/Button'
import { TextField } from '@/app/components/textField/TextField'
import { useArticleForm } from '@/features/articles/lib/hooks/useArticleForm'

export const CreateArticleForm = () => {
	const {
		form: {
			control,
			handleSubmit,
			formState: { errors, isSubmitting },
		},
		onSubmit,
		isEditing,
	} = useArticleForm()

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
