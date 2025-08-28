
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
                 </svg>
                <h1 className="text-xl font-bold text-white">Crypto Tracker</h1>
            </div>
        </header>
    );
};

export default Header;
