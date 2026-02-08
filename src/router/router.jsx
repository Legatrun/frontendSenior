import { TransactionsProvider } from '../store/TransactionsContext'
import Layout from '../components/Layout'
import DashboardPage from '../pages/DashboardPage'
import TransferPage from '../pages/TransferPage'
import HistoryPage from '../pages/HistoryPage'
import { useState } from 'react'

const Router = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <TransactionsProvider>
            <Layout activeTab={activeTab} onTabChange={setActiveTab}>
                {activeTab === 'dashboard' && <DashboardPage />}
                {activeTab === 'simulation' && <TransferPage onSuccess={() => { }} />}
                {activeTab === 'history' && <HistoryPage />}
            </Layout>
        </TransactionsProvider>
    )
}

export default Router