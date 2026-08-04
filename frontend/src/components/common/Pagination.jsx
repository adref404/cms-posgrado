import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const getPageNumbers = (currentPage, totalPages) => {
  const delta = 1;
  const middle = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    middle.push(i);
  }
  if (currentPage - delta > 2) middle.unshift("...");
  if (currentPage + delta < totalPages - 1) middle.push("...");

  return [1, ...middle, totalPages].filter(
    (value, index, arr) => arr.indexOf(value) === index
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Paginación">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-unmsm-navy hover:bg-unmsm-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <MdChevronLeft className="text-xl" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-9 h-9 flex items-center justify-center text-unmsm-muted"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
              page === currentPage
                ? "bg-unmsm-blue text-white"
                : "text-unmsm-navy hover:bg-unmsm-bg"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-unmsm-navy hover:bg-unmsm-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Página siguiente"
      >
        <MdChevronRight className="text-xl" />
      </button>
    </nav>
  );
};

export default Pagination;
