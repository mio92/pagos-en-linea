import React from 'react';
import { UserWithTransactions } from '../types';
import { formatCurrency } from '../utils/dataProcessing';
import { User, CreditCard, TrendingUp } from 'lucide-react';

interface UserCardProps {
  user: UserWithTransactions;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div 
      className="user-card"
      onClick={onClick}
    >
      <div className="user-card-header">
        <div className="user-avatar">
          <User size={24} />
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat">
          <div className="stat-icon">
            <CreditCard size={16} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Transactions</span>
            <span className="stat-value">{user.transactionCount}</span>
            <span className="stat-label">Transactions</span>
            <span className="stat-value">{user.transactionCount}</span>
          </div>
        </div>
        
        <div className="stat">
          <div className="stat-icon">
            <TrendingUp size={16} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Amount</span>
            <span className="stat-value">{formatCurrency(user.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

