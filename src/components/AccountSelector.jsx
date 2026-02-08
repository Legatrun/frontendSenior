const AccountSelector = ({ accounts, label, selectedId, onSelect, error, disabledId }) => {
    const handleSelect = (e) => {
        onSelect(e.target.value);
    };

    const selectedAccount = accounts.find(acc => acc.id === selectedId);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <div className="relative">
                <select
                    value={selectedId || ''}
                    onChange={handleSelect}
                    className="block w-full pl-10 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                    <option value="">-- Select --</option>
                    {accounts.map(acc => (
                        <option
                            key={acc.id}
                            value={acc.id}
                            disabled={acc.id === disabledId}
                        >
                            {acc.holderName} - {acc.currency} {acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {selectedAccount ? (
                        <img src={selectedAccount.photo} alt="" className="h-6 w-6 rounded-full" />
                    ) : (
                        <span className="text-gray-400">👤</span>
                    )}
                </div>
            </div>
            {selectedAccount && (
                <div className="mt-2 flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
                    <img src={selectedAccount.photo} alt={selectedAccount.holderName} className="h-10 w-10 rounded-full mr-3 border-2 border-indigo-500" />
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedAccount.holderName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{selectedAccount.type.toUpperCase()} • Bal: ${selectedAccount.balance.toFixed(2)}</p>
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-sm text-red-600 animate-pulse">{error}</p>}
        </div>
    );
};

export default AccountSelector;
