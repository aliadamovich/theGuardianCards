import {
	ComponentProps,
	KeyboardEvent,
	ReactNode,
	useId,
} from 'react'
import s from './TextField.module.scss'
import { FiSearch } from 'react-icons/fi'
import clsx from 'clsx'

export type TextFieldProps = ComponentProps<'input'> & {
	errorMessage?: string
	label?: ReactNode
	search?: boolean
	onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const TextField = ({
	className,
	search,
	label,
	errorMessage,
	onKeyDown,
	onEnter,
	disabled,
	type = 'text',
	...rest
}: TextFieldProps) => {
	const inputId = useId()
	const showError = !!errorMessage && errorMessage.length > 0

	const classNames = clsx(s.input, search && s.search, showError && s.error)

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (onEnter && e.key === 'Enter') {
			onEnter(e)
		}
		onKeyDown?.(e)
	}



	return (
		<div className={s.box}>
			{label && <label htmlFor={inputId} />}
			<div className={s.inputContainer}>
				{search && <span className={s.startIcon}><FiSearch /></span>}
				<input
					type={type}
					className={classNames}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					{...rest}
					id={inputId}
				/>

			</div>
			{showError && <p className={s.errorText}>{errorMessage}</p>}
		</div>
	)
}