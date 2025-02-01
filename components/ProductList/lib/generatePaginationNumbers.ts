export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pageNumbers: (number | string)[] = [];
  const range = 1;

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const addEllipsisIfNeeded = (condition: boolean) =>
    condition && pageNumbers.push("...");

  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  if (start > 1) {
    pageNumbers.push(1);
    addEllipsisIfNeeded(start > 2);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (end < totalPages) {
    addEllipsisIfNeeded(end < totalPages - 1);
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};
