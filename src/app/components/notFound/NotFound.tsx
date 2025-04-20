import { Link } from 'react-router-dom'
import s from './NotFound.module.scss'
import { PATH } from '@/routes/Paths'
import { Button } from '@/app/components/button/Button'

export const NotFound = () => {
	return (
		<div className={s.container}>
			<div className={s.content}>
				<h1 className={s.errorCode}>404</h1>
				<h2 className={s.errorText}>Page Not Found</h2>
				<p className={s.description}>
					The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the
					homepage.
				</p>
				<Button as={Link} variant="active" to={PATH.ROOT}>
					Back to Home
				</Button>
			</div>
		</div>
	)
}
