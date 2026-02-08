import { createContext, useState, useEffect, useContext } from 'react';
import initialData from '../data/transactions.json';

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
    const [accounts, setAccounts] = useState(() => {
        const saved = localStorage.getItem('accounts');
        return saved ? JSON.parse(saved) : initialData.accounts;
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : initialData.transactions || [];
    });

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [accounts, transactions]);

    const getAccount = (id) => accounts.find(acc => acc.id === id);

    const validateTransaction = (sourceId, destId, amount) => {
        const source = getAccount(sourceId);
        const dest = getAccount(destId);

        if (!source || !dest) return { valid: false, error: 'Invalid accounts' };
        if (sourceId === destId) return { valid: false, error: 'error_same_account' };
        if (amount <= 0) return { valid: false, error: 'error_invalid_amount' };
        if (source.balance < amount) return { valid: false, error: 'error_insufficient_funds' };

        return { valid: true };
    };

    const addTransaction = (sourceId, destId, amount) => {
        const validation = validateTransaction(sourceId, destId, amount);
        if (!validation.valid) return validation;

        const newTransaction = {
            id: `txn-${Date.now()}`,
            sourceId,
            destId,
            amount: parseFloat(amount),
            date: new Date().toISOString()
        };

        const updatedAccounts = accounts.map(acc => {
            if (acc.id === sourceId) {
                return { ...acc, balance: acc.balance - amount };
            }
            if (acc.id === destId) {
                return { ...acc, balance: acc.balance + amount };
            }
            return acc;
        });

        setAccounts(updatedAccounts);
        setTransactions([newTransaction, ...transactions]);

        return { valid: true };
    };

    const getDailyTransactions = () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        return transactions.filter(t => new Date(t.date).getTime() >= startOfDay);
    };

    const getDailyStats = () => {
        const daily = getDailyTransactions();
        const totalAmount = daily.reduce((sum, t) => sum + t.amount, 0);

        const accountCounts = {};
        daily.forEach(t => {
            accountCounts[t.sourceId] = (accountCounts[t.sourceId] || 0) + 1;
            accountCounts[t.destId] = (accountCounts[t.destId] || 0) + 1;
        });

        let topAccountId = null;
        let maxCount = 0;
        Object.entries(accountCounts).forEach(([id, count]) => {
            if (count > maxCount) {
                maxCount = count;
                topAccountId = id;
            }
        });

        const topAccount = topAccountId ? getAccount(topAccountId) : null;

        return {
            count: daily.length,
            totalAmount,
            topAccount
        };
    };

    const value = {
        accounts,
        transactions,
        addTransaction,
        validateTransaction,
        getDailyStats,
        getDailyTransactions
    };

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    );
};
