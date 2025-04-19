import s from './ErrorMessage.module.scss'

type ErrorMessageProps = {
	message: string
	className?: string
}

export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
	return <div className={`${s.error} ${className}`}>{message}</div>
}
