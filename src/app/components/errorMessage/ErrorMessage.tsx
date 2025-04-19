import { Link } from 'react-router-dom'
import s from './ErrorMessage.module.scss'
import clsx from 'clsx'
import { PATH } from '@/routes/Paths'
import { Button } from '@/app/components/button/Button'

type ErrorMessageProps = {
	message: string
	fullScreen?: boolean
}

export const ErrorMessage = ({ message, fullScreen = false }: ErrorMessageProps) => {
	return (
		<div className={clsx(s.errorWrapper, fullScreen && s.fullScreen)}>
			<div className={s.error}>{message}</div>
			{fullScreen && <Button as={Link} variant='link' to={PATH.ROOT}>Back to Main Page</Button>}
		</div>
	)
}
