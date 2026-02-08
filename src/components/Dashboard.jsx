import { useMemo } from 'react';
import { useTransactions } from '../store/TransactionsContext';
import CryptoWidget from './CryptoWidget';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { getDailyStats } = useTransactions();
    const { t } = useTranslation();
    const stats = useMemo(() => getDailyStats(), [getDailyStats]);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b-2 border-indigo-500 pb-2 inline-block">
                {t('dashboard')}
            </h1>

            <div className="mb-8">
                <CryptoWidget />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold opacity-80">{t('total_transactions')}</h3>
                        <svg className="w-8 h-8 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    </div>
                    <p className="text-4xl font-bold">{stats.count}</p>
                    <p className="text-sm mt-2 opacity-70">Today</p>
                </div>

                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold opacity-80">{t('total_amount')}</h3>
                        <svg className="w-8 h-8 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <p className="text-4xl font-bold">${stats.totalAmount.toLocaleString()}</p>
                    <p className="text-sm mt-2 opacity-70">Today</p>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold opacity-80">{t('top_account')}</h3>
                        <svg className="w-8 h-8 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    {stats.topAccount ? (
                        <div className="flex items-center mt-2">
                            <img src={stats.topAccount.photo} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white mr-3" />
                            <div>
                                <p className="text-xl font-bold truncate w-32">{stats.topAccount.holderName}</p>
                                <p className="text-xs opacity-80">{stats.topAccount.type}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xl font-bold opacity-80">--</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
