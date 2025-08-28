
import { Coin } from '../types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async (page: number = 1, perPage: number = 50): Promise<Coin[]> => {
    const url = new URL(`${API_BASE_URL}/coins/markets`);
    url.searchParams.append('vs_currency', 'usd');
    url.searchParams.append('order', 'market_cap_desc');
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('page', page.toString());
    url.searchParams.append('sparkline', 'false');
    url.searchParams.append('price_change_percentage', '1h,7d');

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API request failed with status ${response.status}`);
        }
        const data: Coin[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch coins:', error);
        throw new Error('Failed to fetch data from CoinGecko API.');
    }
};
