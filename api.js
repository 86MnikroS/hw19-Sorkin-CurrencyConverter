const API_KEY = '3ddd1b47f25e6049d605f2ad9a9616b1';
const BASE_URL = 'https://data.fixer.io/api';

async function getCurrencySymbols() {
    const url = `${BASE_URL}/symbols?access_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error?.info || 'Failed to fetch symbols');
        }

        return data.symbols;
    } catch (err) {
        console.error("Error fetching symbols:", err.message);
        return null;
    }
}

async function getExchangeRate(targetCurrency) {
    const currency = targetCurrency.toUpperCase();
    const url = `${BASE_URL}/latest?access_key=${API_KEY}&symbols=${currency}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error?.info || 'Failed to fetch rate');
        }

        const rate = data.rates[currency];

        if (!rate) {
            throw new Error(`No rate available for ${currency}`);
        }

        return rate;
    } catch (err) {
        console.error("Error fetching exchange rate:", err.message);
        return null;
    }
}
