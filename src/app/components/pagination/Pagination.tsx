import clsx from 'clsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import s from './pagination.module.scss'
import { usePagination } from './usePagination'


type Props = {
	className?: string
	currentPage: number
	onPageChange: (page: number) => void
	totalPages?: number
}

export const Pagination = ({
	className,
	currentPage,
	onPageChange,
	totalPages = 1,
}: Props) => {
	const {
		pages,
		hasPrevGroup,
		hasNextGroup,
		prevGroupPage,
		nextGroupPage
	} = usePagination(currentPage, totalPages, 5)

	const handlePageClick = (page: number) => {
		if (page !== currentPage ) {
			onPageChange(page)
		}
	}

	return (
		<div className={clsx(s.pagination, className)}>
			<div className={s.buttons}>
				<button
					className={clsx(s.button, !hasPrevGroup && s.arrowDisabled)}
					disabled={!hasPrevGroup}
					onClick={() => onPageChange(prevGroupPage)}
					type={'button'}
					aria-label="Previous page group"
				>
					<FiChevronLeft />
				</button>

				{pages.map((page, index) => (
					<button
						className={clsx(s.button, page === currentPage && s.active)}
						disabled={page === currentPage}
						key={index}
						onClick={() => handlePageClick(page)}
						type={'button'}
						aria-label={`Page ${page}`}
					>
						{page}
					</button>
				))}

				<button
					className={clsx(s.button, !hasNextGroup && s.arrowDisabled)}
					disabled={!hasNextGroup}
					onClick={() => onPageChange(nextGroupPage)}
					type={'button'}
					aria-label="Next page group"
				>
					<FiChevronRight />
				</button>
			</div>

			</div>
	)
}
