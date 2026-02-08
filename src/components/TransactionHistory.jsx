import React, { useState, useMemo } from 'react';
import { useTransactions } from '../store/TransactionsContext';
import { useTranslation } from 'react-i18next';

const TransactionHistory = () => {
    const { transactions, accounts } = useTransactions();
    const { t } = useTranslation();

    const [filters, setFilters] = useState({
        source: '',
        dest: '',
        minAmount: '',
        maxAmount: ''
    });

    const filteredTransactions = useMemo(() => {
        return transactions.filter(txn => {
            const matchesSource = !filters.source || txn.sourceId === filters.source;
            const matchesDest = !filters.dest || txn.destId === filters.dest;
            const amount = parseFloat(txn.amount);
            const min = parseFloat(filters.minAmount);
            const max = parseFloat(filters.maxAmount);
            const matchesMin = isNaN(min) || amount >= min;
            const matchesMax = isNaN(max) || amount <= max;

            return matchesSource && matchesDest && matchesMin && matchesMax;
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    }, [transactions, filters]);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const getAccountName = (id) => {
        const acc = accounts.find(a => a.id === id);
        return acc ? acc.holderName : id;
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6 transition hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2">
                {t('history')}
            </h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">{t('source_account')}</label>
                    <select
                        value={filters.source}
                        onChange={(e) => handleFilterChange('source', e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-600 dark:text-white"
                    >
                        <option value="">{t('all') || 'All'}</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.holderName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">{t('destination_account')}</label>
                    <select
                        value={filters.dest}
                        onChange={(e) => handleFilterChange('dest', e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-600 dark:text-white"
                    >
                        <option value="">{t('all') || 'All'}</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.holderName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">{t('min_amount')}</label>
                    <input
                        type="number"
                        value={filters.minAmount}
                        onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-600 dark:text-white"
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase">{t('max_amount')}</label>
                    <input
                        type="number"
                        value={filters.maxAmount}
                        onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm dark:bg-gray-600 dark:text-white"
                        placeholder="10000.00"
                    />
                </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">{t('date')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">{t('source_account')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">{t('destination_account')}</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">{t('amount')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(txn => (
                                <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(txn.date).toLocaleDateString()} {new Date(txn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {getAccountName(txn.sourceId)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {getAccountName(txn.destId)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600 dark:text-green-400">
                                        ${txn.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    {t('no_transactions')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Total Filtered Summary - Optional but nice */}
            {filteredTransactions.length > 0 && (
                <div className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">
                    Total: <span className="font-bold text-gray-900 dark:text-white">${filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}</span>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
