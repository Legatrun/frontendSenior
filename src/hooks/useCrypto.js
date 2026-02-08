import { useState, useEffect, useRef } from 'react';
import { FINNHUB_SOCKET_URL } from '../services/finnhub';

const SOCKET_URL = FINNHUB_SOCKET_URL;

export const useCrypto = (symbol = 'BINANCE:BTCUSDT') => {
    const [price, setPrice] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [status, setStatus] = useState('disconnected');
    const ws = useRef(null);

    useEffect(() => {
        const connect = () => {
            setStatus('connecting');
            ws.current = new WebSocket(SOCKET_URL);

            ws.current.onopen = () => {
                setStatus('connected');
                ws.current.send(JSON.stringify({ type: 'subscribe', symbol }));
            };

            ws.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'trade') {
                    const trade = message.data[0];
                    setPrice(trade.p);
                    setLastUpdated(new Date(trade.t).toLocaleTimeString());
                }
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
                setStatus('error');
            };

            ws.current.onclose = () => {
                setStatus('disconnected');
            };
        };

        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [symbol]);

    return { price, lastUpdated, status };
};
