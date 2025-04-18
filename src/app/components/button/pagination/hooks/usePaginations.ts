export const usePagination = (currentPage: number, totalPages: number, visiblePages: number = 5) => {
  // Calculate the center of the pagination window
  const half = Math.floor(visiblePages / 2);

  // Calculate the starting page for the pagination window
  let start = Math.max(currentPage - half, 1);
  
  // Calculate the ending page for the pagination window
  let end = Math.min(start + visiblePages - 1, totalPages);
  
  // Adjust the start if we're near the end
  if (end - start + 1 < visiblePages && start > 1) {
    start = Math.max(end - visiblePages + 1, 1);
  }

  // Generate the array of page numbers to display
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Calculate if previous group button should be enabled
  const hasPrevGroup = start > 1;
  
  // Calculate if next group button should be enabled
  const hasNextGroup = end < totalPages;
  
  // Calculate the page to go to when clicking previous group button
  // This takes you to the last page of the previous group
  const prevGroupPage = Math.max(start - 1, 1);
  
  // Calculate the page to go to when clicking next group button
  // This takes you to the first page of the next group
  const nextGroupPage = Math.min(end + 1, totalPages);

  return {
    pages,
    startPage: start,
    endPage: end,
    hasPrevGroup,
    hasNextGroup,
    prevGroupPage,
    nextGroupPage,
  };
};