import React from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/dataProcessing';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="status-icon completed" />;
      case 'pending':
        return <Clock size={16} className="status-icon pending" />;
      case 'failed':
        return <XCircle size={16} className="status-icon failed" />;
      default:
        return <Clock size={16} className="status-icon" />;
    }
  };

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <div className="transaction-items">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-status">
              {getStatusIcon(transaction.status)}
            </div>
            
            <div className="transaction-details">
              <div className="transaction-id">
                Transaction #{transaction.id}
              </div>
              <div className="transaction-date">
                {formatDate(transaction.created_at)}
              </div>
            </div>
            
            <div className="transaction-amount">
              {formatCurrency(transaction.amount)}
              <p>crea en el dia de hoy: {formatDate(transaction.created_at)}</p>
              <p>crea en el dia de hoy: {formatDate(transaction.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;

