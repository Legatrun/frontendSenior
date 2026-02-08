import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "simulation": "Simulation Panel",
            "dashboard": "Dashboard",
            "history": "History",
            "total_transactions": "Total Transactions",
            "total_amount": "Total Amount",
            "top_account": "Most Active Account",
            "crypto_market": "Crypto Market",
            "source_account": "Source Account",
            "destination_account": "Destination Account",
            "amount": "Amount",
            "transfer": "Transfer",
            "filters": "Filters",
            "min_amount": "Min Amount",
            "max_amount": "Max Amount",
            "select_account": "Select Account",
            "success_msg": "Transfer Successful",
            "error_insufficient_funds": "Insufficient funds",
            "error_same_account": "Source and destination cannot be the same",
            "error_invalid_amount": "Please enter a valid amount",
            "date": "Date",
            "balance_available": "Available Balance",
            "no_transactions": "No transactions found",
            "btc_price": "BTC Price",
            "recent_trades": "Recent Trades"
        }
    },
    es: {
        translation: {
            "Welcome to React": "Bienvenido a React y react-i18next",
            "simulation": "Panel de Simulación",
            "dashboard": "Dashboard",
            "history": "Historial de Transferencias",
            "total_transactions": "Total Transacciones",
            "total_amount": "Monto Total Transferido",
            "top_account": "Cuenta Más Activa",
            "crypto_market": "Mercado Crypto en Vivo",
            "source_account": "Cuenta Origen",
            "destination_account": "Cuenta Destino",
            "amount": "Monto a Transferir",
            "transfer": "Realizar Transferencia",
            "filters": "Filtros",
            "min_amount": "Monto Mínimo",
            "max_amount": "Monto Máximo",
            "select_account": "Seleccionar Cuenta",
            "success_msg": "Transferencia Exitosa",
            "error_insufficient_funds": "Saldo insuficiente",
            "error_same_account": "La cuenta destino no puede ser la misma que origen",
            "error_invalid_amount": "Ingrese un monto válido",
            "date": "Fecha",
            "balance_available": "Saldo Disponible",
            "no_transactions": "No se encontraron transacciones",
            "btc_price": "Precio BTC",
            "recent_trades": "Últimas Operaciones"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;