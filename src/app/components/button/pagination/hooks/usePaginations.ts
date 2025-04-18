
export const usePagination = (currentPage: number, totalPages: number, visiblePages: number = 5) => {
	const half = Math.floor(visiblePages / 2)


		let start = Math.max(currentPage - half, 1)
		let end = start + visiblePages - 1

		if (end > totalPages) {
			end = totalPages
			start = Math.max(end - visiblePages + 1, 1)
		}

		const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

		return {
			pages,
			startPage: start,
			endPage: end,
			hasPrevGroup: start > 1,
			hasNextGroup: end < totalPages,
			prevGroupPage: Math.max(start - visiblePages, 1),
			nextGroupPage: Math.min(start + visiblePages, totalPages - visiblePages + 1),
		}

}