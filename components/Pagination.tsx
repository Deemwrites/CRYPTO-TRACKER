
import React from 'react';

interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onNextPage, onPrevPage }) => {
    return (
        <div className="flex justify-center items-center mt-8 space-x-4">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
            >
                Previous
            </button>
            <span className="text-lg font-medium text-gray-300">{currentPage}</span>
            <button
                onClick={onNextPage}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-indigo-600 transition-colors"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
