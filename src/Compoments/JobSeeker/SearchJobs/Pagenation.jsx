import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-1.5 border rounded-l-lg bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 border bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 border ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors'}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages - 1 && <span className="px-3 py-1.5 text-gray-700">...</span>}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 border bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-1.5 border rounded-r-lg bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
        disabled={currentPage === totalPages}
      >
        Last
      </button>
      <span className="px-3 py-1.5 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
