export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pageNumbers: (number | string)[] = [];
  const range = 1;

  if (totalPages <= 7) {
    // Если страниц меньше или равно 7, выводим все страницы
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Функция для добавления многоточий
  const addEllipsisIfNeeded = (condition: boolean) =>
    condition && pageNumbers.push("...");

  // Начало и конец диапазонов
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  // Сначала добавляем 1 страницу, если она не попала в диапазон
  if (start > 1) {
    pageNumbers.push(1);
    addEllipsisIfNeeded(start > 2);
  }

  // Добавляем страницы в диапазоне от start до end
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  // Заключение, если конец диапазона не включает последнюю страницу
  if (end < totalPages) {
    addEllipsisIfNeeded(end < totalPages - 1);
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};
