
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 py-4 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
                <p>
                    Powered by{' '}
                    <a
                        href="https://www.coingecko.com/en/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                        aria-label="Visit CoinGecko API documentation"
                    >
                        CoinGecko API
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
