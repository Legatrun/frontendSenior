import { useState, useEffect } from 'react';
import { useTransactions } from '../store/TransactionsContext';
import AccountSelector from './AccountSelector';
import { useTranslation } from 'react-i18next';

const TransferForm = ({ onTransferSuccess }) => {
    const { accounts, addTransaction } = useTransactions();
    const { t } = useTranslation();

    const [sourceId, setSourceId] = useState('');
    const [destId, setDestId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setError({});
    }, [sourceId, destId, amount]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleTransfer = (e) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError({ amount: t('error_invalid_amount') });
            return;
        }

        const result = addTransaction(sourceId, destId, numericAmount);

        if (!result.valid) {
            const msg = t(result.error);
            if (result.error.includes('funds')) setError({ amount: msg });
            else if (result.error.includes('same')) setError({ dest: msg });
            else setError({ general: msg });
        } else {
            setSuccess(true);
            setAmount('');
            setSourceId('');
            setDestId('');
            if (onTransferSuccess) onTransferSuccess();
        }
    };
    const destOptions = accounts.filter(acc => acc.id !== sourceId);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                {t('simulation')}
            </h2>

            {success && (
                <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 animate-bounce">
                    <p className="font-bold">Success!</p>
                    <p>{t('success_msg')}</p>
                </div>
            )}

            <form onSubmit={handleTransfer} spacing={4}>
                <AccountSelector
                    label={t('source_account')}
                    accounts={accounts}
                    selectedId={sourceId}
                    onSelect={setSourceId}
                    error={error.source}
                />

                <div className="relative flex justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <span className="relative z-10 bg-white dark:bg-gray-800 px-2 text-gray-500">
                        ↓
                    </span>
                </div>

                <AccountSelector
                    label={t('destination_account')}
                    accounts={destOptions} // Limit choices
                    selectedId={destId}
                    onSelect={setDestId}
                    error={error.dest}
                    disabledId={sourceId} // Double safety
                />

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('amount')}</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 dark:text-white ${error.amount ? 'border-red-500 text-red-900' : 'border-gray-300'}`}
                        placeholder="0.00"
                    />
                    {error.amount && <p className="mt-1 text-sm text-red-600 animate-pulse">{error.amount}</p>}
                </div>

                <button
                    type="submit"
                    disabled={!sourceId || !destId || !amount}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${(!sourceId || !destId || !amount) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {t('transfer')}
                </button>
            </form>
        </div>
    );
};

export default TransferForm;
