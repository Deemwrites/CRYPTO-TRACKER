
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Coin } from './types';
import { fetchCoins } from './services/coingecko';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CoinRow from './components/CoinRow';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const coinsPerPage = 50;

    const getCoins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCoins(page, coinsPerPage);
            setCoins(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        getCoins();
    }, [getCoins]);

    const filteredCoins = useMemo(() => {
        return coins.filter(coin =>
            coin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [coins, debouncedSearchTerm]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-white">Market Overview</h1>
                    <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">#</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Coin</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">1h %</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider">24h %</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">7d %</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Market Cap</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-400 uppercase tracking-wider hidden xl:table-cell">Volume (24h)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={8} className="text-center p-8">
                                            <div className="flex justify-center items-center">
                                                <LoadingSpinner />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {error && (
                                     <tr>
                                        <td colSpan={8} className="text-center p-8 text-red-400">
                                            Error: {error}. Please try again later.
                                        </td>
                                    </tr>
                                )}
                                {!loading && !error && filteredCoins.length > 0 && (
                                    filteredCoins.map(coin => <CoinRow key={coin.id} coin={coin} />)
                                )}
                                {!loading && !error && filteredCoins.length === 0 && (
                                     <tr>
                                        <td colSpan={8} className="text-center p-8 text-gray-400">
                                            No coins found for your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {!loading && !error && (
                    <Pagination
                        currentPage={page}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
