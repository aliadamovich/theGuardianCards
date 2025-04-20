import { ComponentPropsWithoutRef, ElementType } from 'react'
import s from './Button.module.scss'
import clsx from 'clsx'
const buttonVariant = ['primary', 'active', 'link'] as const

type ButtonVariant = (typeof buttonVariant)[number]

export type ButtonProps<T extends ElementType = 'button'> = {
	as?: T
	variant?: ButtonVariant
	className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
	const { as: Component = 'button', variant = 'primary', children, className, ...rest } = props

	const classNames = clsx(s.button, s[variant], className)

	return (
		<Component className={classNames} {...rest}>
			{children}
		</Component>
	)
}
