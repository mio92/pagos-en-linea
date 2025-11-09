import React, { useState, useMemo } from 'react';
import { UserWithTransactions } from '../types';
import { processUserTransactions, calculateTransactionSummary } from '../utils/dataProcessing';
import { mockUsers, mockTransactions } from '../data/mockData';
import UserCard from './UserCard';
import UserDetail from './UserDetail';
import { Search, Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessing';

const Dashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserWithTransactions | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const usersWithTransactions = useMemo(() => {
    return processUserTransactions(mockUsers, mockTransactions);
  }, []);

  const transactionSummary = useMemo(() => {
    return calculateTransactionSummary(mockTransactions);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return usersWithTransactions;
    
    return usersWithTransactions.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [usersWithTransactions, searchTerm]);

  if (selectedUser) {
    return (
      <UserDetail 
        user={selectedUser} 
        onBack={() => setSelectedUser(null)} 
      />
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Transacciones de Usuarios</h1>
        <p>Monitorea y analiza los datos de transacciones de usuarios</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Usuarios Activos</h3>
            <p className="stat-number">{usersWithTransactions.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Transacciones Totales</h3>
            <p className="stat-number">{transactionSummary.totalTransactions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Volumen Total</h3>
            <p className="stat-number">{formatCurrency(transactionSummary.totalAmount)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Transacción Promedio</h3>
            <p className="stat-number">{formatCurrency(transactionSummary.averageAmount)}</p>
          </div>
        </div>
      </div>


      <div className="users-grid">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron usuarios que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

