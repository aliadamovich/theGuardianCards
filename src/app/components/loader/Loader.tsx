import clsx from 'clsx'
import s from './Loader.module.scss'


export const Loader = ({fullScreen}: {fullScreen?: boolean}) => {
	return (
		<div
			className={clsx(s.loaderWrapper, fullScreen && s.fullScreen)}
			role="status"
			aria-busy="true"
		>
			<div className={s.spinner} />
		</div>
	)
}
