
import React from 'react';
import { Coin } from '../types';

interface CoinRowProps {
    coin: Coin;
}

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: price > 1 ? 2 : 6,
    }).format(price);
};

const formatMarketCap = (marketCap: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2
    }).format(marketCap);
};

const PriceChange: React.FC<{ percentage: number | null | undefined }> = ({ percentage }) => {
    if (percentage === null || percentage === undefined) {
        return <span className="text-gray-400">-</span>;
    }
    const isPositive = percentage >= 0;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';

    return (
        <span className={colorClass}>
            {isPositive ? '▲' : '▼'} {Math.abs(percentage).toFixed(2)}%
        </span>
    );
};

const CoinRow: React.FC<CoinRowProps> = ({ coin }) => {
    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
            <td className="p-4 text-gray-400">{coin.market_cap_rank}</td>
            <td className="p-4">
                <div className="flex items-center">
                    <img src={coin.image} alt={coin.name} className="h-6 w-6 mr-3 rounded-full" />
                    <div>
                        <div className="font-bold text-white">{coin.name}</div>
                        <div className="text-sm text-gray-400 uppercase">{coin.symbol}</div>
                    </div>
                </div>
            </td>
            <td className="p-4 text-right font-medium text-white">{formatPrice(coin.current_price)}</td>
            <td className="p-4 text-right hidden sm:table-cell">
                <PriceChange percentage={coin.price_change_percentage_1h_in_currency} />
            </td>
            <td className="p-4 text-right">
                <PriceChange percentage={coin.price_change_percentage_24h} />
            </td>
            <td className="p-4 text-right hidden md:table-cell">
                <PriceChange percentage={coin.price_change_percentage_7d_in_currency} />
            </td>
            <td className="p-4 text-right text-gray-300 hidden lg:table-cell">{formatMarketCap(coin.market_cap)}</td>
            <td className="p-4 text-right text-gray-300 hidden xl:table-cell">{formatMarketCap(coin.total_volume)}</td>
        </tr>
    );
};

export default CoinRow;
