import clsx from 'clsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import s from './pagination.module.scss'
import { usePagination } from '@/app/components/button/pagination/hooks/usePaginations'


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
		startPage,
		endPage,
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
					className={clsx(s.button, currentPage === 1 && s.arrowDisabled)}
					disabled={currentPage === 1}
					onClick={() => onPageChange(prevGroupPage)}
					type={'button'}
					aria-label="Previous page"
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
					>
						{page}
					</button>
				))}

				<button
					className={clsx(
						s.button,
						(currentPage === totalPages || totalPages === 0) && s.arrowDisabled
					)}
					disabled={currentPage === totalPages || totalPages === 0}
					onClick={() => onPageChange(nextGroupPage)}
					type={'button'}
					aria-label="Next page"
				>
					<FiChevronRight />
				</button>
			</div>

			</div>
	)
}
