import React from 'react';
import { UserWithTransactions } from '../types';
import { formatCurrency } from '../utils/dataProcessing';
import { ArrowLeft, Mail, Calendar, DollarSign } from 'lucide-react';
import TransactionList from './TransactionList';
import TransactionChart from './TransactionChart';

interface UserDetailProps {
  user: UserWithTransactions;
  onBack: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  const averageTransaction = user.transactionCount > 0 
    ? user.totalAmount / user.transactionCount 
    : 0;

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Users
        </button>
        
        <div className="user-profile">
          <div className="user-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-profile-info">
            <h1>{user.name}</h1>
            <div className="user-contact">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="user-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <h3>Total Amount</h3>
            <p className="summary-value">{formatCurrency(user.totalAmount)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <Calendar size={24} />
          </div>
          <div className="summary-content">
            <h3>Total Transactions</h3>
            <p className="summary-value">{user.transactionCount}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
            <h3>Average Transaction</h3>
            <p className="summary-value">{formatCurrency(averageTransaction)}</p>
          </div>
        </div>
      </div>

      <div className="user-detail-content">
        <div className="chart-section">
          <TransactionChart transactions={user.transactions} />
        </div>
        
        <div className="list-section">
          <TransactionList transactions={user.transactions} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

