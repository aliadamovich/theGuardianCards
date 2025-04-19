import s from './Loader.module.scss'


export const Loader = () => {
	return (
		<div
			className={s.loaderWrapper}
			role="status"
			aria-busy="true"
		>
			<div className={s.spinner} />
		</div>
	)
}
