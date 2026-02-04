import { Revenue } from './definitions';

// utils.ts
export const formatCurrency = (
  amount: number,
  currency: 'USD' | 'PKR' | 'EUR',
  locale = 'en-US'
) => {
  return (amount / 100).toLocaleString(locale, {
    style: 'currency',
    currency,
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function generateYAxis(data: { month: string; revenue: number; currency?: string }[]) {
  if (!data || data.length === 0) return { yAxisLabels: [], topLabel: 0 };

  const revenues = data.map((d) => d.revenue);
  const maxRevenue = Math.max(...revenues);

  // 5 steps only
  const step = Math.ceil(maxRevenue / 5);

  // Generate labels from max → 0 (descending)
  const yAxisLabels = Array.from({ length: 6 }, (_, i) => `$${(step * (5 - i)).toLocaleString()}`);

  return { yAxisLabels, topLabel: maxRevenue };
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
