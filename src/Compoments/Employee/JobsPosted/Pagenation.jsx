import React from 'react';

const Pagination = ({ totalJobs, jobsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex justify-center my-2">
            {currentPage > 1 && (
                <button
                    onClick={handlePreviousPage}
                    className={`px-3 py-1 mx-1 rounded bg-blue-500 text-white`}
                >
                    Previous
                </button>
            )}
            {[...Array(totalPages).keys()].map((_, index) => (
                (index + 1 === currentPage || index + 1 === currentPage + 1 || index + 1 === currentPage - 1) &&
                <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                >
                    {index + 1}
                </button>
            ))}
            {currentPage < totalPages && (
                <button
                    onClick={handleNextPage}
                    className={`px-3 py-1 mx-1 rounded bg-blue-500 text-white`}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
