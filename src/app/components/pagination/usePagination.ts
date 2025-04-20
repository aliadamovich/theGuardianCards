export const usePagination = (currentPage: number, totalPages: number, visiblePages: number = 5) => {
	const half = Math.floor(visiblePages / 2)

	let start = Math.max(currentPage - half, 1)

	let end = Math.min(start + visiblePages - 1, totalPages)

	if (end - start + 1 < visiblePages && start > 1) {
		start = Math.max(end - visiblePages + 1, 1)
	}

	const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

	const hasPrevGroup = start > 1

	const hasNextGroup = end < totalPages

	const prevGroupPage = Math.max(start - 1, 1)

	const nextGroupPage = Math.min(end + 1, totalPages)

	return {
		pages,
		startPage: start,
		endPage: end,
		hasPrevGroup,
		hasNextGroup,
		prevGroupPage,
		nextGroupPage,
	}
}
