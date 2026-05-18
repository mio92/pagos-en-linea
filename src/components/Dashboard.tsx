import React, { useState, useMemo } from 'react';
import { UserWithTransactions, Transaction } from '../types';
import { processUserTransactions, calculateTransactionSummary, formatCurrency, formatDate } from '../utils/dataProcessing';
import { mockUsers, mockTransactions } from '../data/mockData';
import UserCard from './UserCard';
import UserDetail from './UserDetail';
import { Search, Users, DollarSign, TrendingUp, Activity, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

type StatusFilter = 'all' | 'completed' | 'pending' | 'failed';

const Dashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserWithTransactions | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [viewMode, setViewMode] = useState<'users' | 'transactions'>('users');

  const usersWithTransactions = useMemo(() => {
    return processUserTransactions(mockUsers, mockTransactions);
  }, []);

  const transactionSummary = useMemo(() => {
    return calculateTransactionSummary(mockTransactions);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return usersWithTransactions;
    const term = searchTerm.toLowerCase();
    return usersWithTransactions.filter(
      user => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
  }, [usersWithTransactions, searchTerm]);

  const filteredTransactions = useMemo(() => {
    let transactions = [...mockTransactions];

    if (statusFilter !== 'all') {
      transactions = transactions.filter(t => t.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchingUserIds = mockUsers
        .filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term))
        .map(u => u.id);
      transactions = transactions.filter(t => matchingUserIds.includes(t.user_id));
    }

    return transactions;
  }, [statusFilter, searchTerm]);

  const getUserName = (userId: number): string => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Usuario desconocido';
  };

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

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallida';
      default: return status;
    }
  };

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

      <div className="dashboard-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'users' ? 'active' : ''}`}
            onClick={() => setViewMode('users')}
          >
            <Users size={16} />
            Usuarios
          </button>
          <button
            className={`toggle-btn ${viewMode === 'transactions' ? 'active' : ''}`}
            onClick={() => setViewMode('transactions')}
          >
            <Activity size={16} />
            Todas las Transacciones
          </button>
        </div>

        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder={viewMode === 'users' ? 'Buscar usuario por nombre o email...' : 'Filtrar por nombre de usuario...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {viewMode === 'transactions' && (
          <div className="filter-bar">
            <Filter size={16} />
            <span className="filter-label">Estado:</span>
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Todas
            </button>
            <button
              className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              <CheckCircle size={14} />
              Completadas
            </button>
            <button
              className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pending')}
            >
              <Clock size={14} />
              Pendientes
            </button>
            <button
              className={`filter-btn ${statusFilter === 'failed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('failed')}
            >
              <XCircle size={14} />
              Fallidas
            </button>
          </div>
        )}
      </div>

      {viewMode === 'users' && (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <p>No se encontraron usuarios con el término "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {viewMode === 'transactions' && (
        <div className="transactions-table">
          <div className="table-header">
            <span>ID</span>
            <span>Usuario</span>
            <span>Monto</span>
            <span>Estado</span>
            <span>Fecha</span>
          </div>
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className="table-row">
              <span className="cell-id">#{transaction.id}</span>
              <span className="cell-user">{getUserName(transaction.user_id)}</span>
              <span className="cell-amount">{formatCurrency(transaction.amount)}</span>
              <span className={`cell-status status-${transaction.status}`}>
                {getStatusIcon(transaction.status)}
                {getStatusLabel(transaction.status)}
              </span>
              <span className="cell-date">{formatDate(transaction.created_at)}</span>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="empty-state">
              <p>No se encontraron transacciones con los filtros aplicados</p>
            </div>
          )}
          <div className="table-footer">
            <span>{filteredTransactions.length} transacción(es) encontrada(s)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

