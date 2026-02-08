import TransferForm from '../components/TransferForm';

const TransferPage = ({ onSuccess }) => {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <TransferForm onTransferSuccess={onSuccess} />
        </div>
    );
};

export default TransferPage;
