import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Layout = ({ children, activeTab, onTabChange }) => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    const navItems = [
        { id: 'dashboard', label: t('dashboard'), icon: '📊' },
        { id: 'simulation', label: t('simulation'), icon: '💸' },
        { id: 'history', label: t('history'), icon: '📜' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent cursor-pointer" onClick={() => onTabChange('dashboard')}>
                                Merlo Wallet Demo
                            </span>
                        </div>

                        <div className="hidden md:flex space-x-8 items-center">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onTabChange(item.id)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${activeTab === item.id
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                                        : 'text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-300'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                            <div className="flex space-x-2">
                                <button onClick={() => changeLanguage('en')} className={`px-2 py-1 text-xs font-bold rounded ${i18n.language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</button>
                                <button onClick={() => changeLanguage('es')} className={`px-2 py-1 text-xs font-bold rounded ${i18n.language === 'es' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>ES</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-t border-t border-gray-200 dark:border-gray-700 z-50 flex justify-around py-3">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`flex flex-col items-center text-xs ${activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        <span className="text-xl mb-1">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
                {children}
            </main>
        </div>
    );
};

export default Layout;
