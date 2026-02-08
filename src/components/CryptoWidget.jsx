import { useEffect, useState } from 'react';
import { useCrypto } from '../hooks/useCrypto';
import { useTranslation } from 'react-i18next';

const CryptoWidget = () => {
    const { t } = useTranslation();
    const { price, lastUpdated, status } = useCrypto('BINANCE:BTCUSDT');
    const [prevPrice, setPrevPrice] = useState(price);
    const [trend, setTrend] = useState('neutral');

    useEffect(() => {
        if (price > prevPrice) setTrend('up');
        else if (price < prevPrice) setTrend('down');
        setPrevPrice(price);
    }, [price]);

    const color = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-between animate-fade-in">
            <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('crypto_market')} (BTC/USDT)</h3>
                <div className={`text-2xl font-bold ${color} transition-colors duration-300`}>
                    ${price ? price.toLocaleString() : '---'}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                    {status === 'connected' ? `Live • ${lastUpdated || ''}` : 'Connecting...'}
                </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
        </div>
    );
};

export default CryptoWidget;
