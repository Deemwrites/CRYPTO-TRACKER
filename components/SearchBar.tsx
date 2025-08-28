
import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </span>
            <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search for a crypto..."
                className="w-full md:w-64 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
        </div>
    );
};

export default SearchBar;
